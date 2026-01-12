/**
 * Blog query functions for TechFlunky Labs
 * Fetches published blog posts from the shared D1 database
 */

import type {
  BlogPost,
  BlogPostDisplay,
  BlogListResponse,
  BlogFilters,
  BlogCategory,
  BlogTag,
} from './types';

// TechFlunky Labs project ID in the CRM database
// This should match the project slug in astro-crm
const TFLABS_PROJECT_SLUG = 'tflabs';

/**
 * Calculate reading time from content
 * Assumes average reading speed of 200 words per minute
 */
function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

/**
 * Parse tags from JSON string
 */
function parseTags(tagsJson: string | null): string[] {
  if (!tagsJson) return [];
  try {
    const parsed = JSON.parse(tagsJson);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Transform database row to display format
 */
function toDisplayFormat(post: BlogPost, mediaUrl?: string): BlogPostDisplay {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    featuredImage: mediaUrl || null,
    category: post.category,
    tags: parseTags(post.tags),
    metaDescription: post.meta_description,
    publishedAt: post.published_at,
    readingTime: calculateReadingTime(post.content),
    viewCount: post.view_count,
    authorName: 'TechFlunky Labs',
    isAiGenerated: Boolean(post.ai_generated),
  };
}

/**
 * Get the TechFlunky project ID from the database
 */
async function getProjectId(db: D1Database): Promise<string | null> {
  const result = await db
    .prepare('SELECT id FROM projects WHERE slug = ?')
    .bind(TFLABS_PROJECT_SLUG)
    .first<{ id: string }>();
  return result?.id || null;
}

/**
 * Get published blog posts with pagination
 */
export async function getPublishedPosts(
  db: D1Database,
  filters: BlogFilters = {}
): Promise<BlogListResponse> {
  const { category, tag, search, page = 1, pageSize = 10 } = filters;
  const offset = (page - 1) * pageSize;

  const projectId = await getProjectId(db);
  if (!projectId) {
    return { posts: [], total: 0, page, pageSize, totalPages: 0 };
  }

  // Build query conditions
  const conditions: string[] = [
    "status = 'published'",
    'project_id = ?',
    'published_at IS NOT NULL',
  ];
  const params: (string | number)[] = [projectId];

  if (category) {
    conditions.push('category = ?');
    params.push(category);
  }

  if (tag) {
    conditions.push("tags LIKE '%' || ? || '%'");
    params.push(tag);
  }

  if (search) {
    conditions.push("(title LIKE '%' || ? || '%' OR excerpt LIKE '%' || ? || '%')");
    params.push(search, search);
  }

  const whereClause = conditions.join(' AND ');

  // Get total count
  const countResult = await db
    .prepare(`SELECT COUNT(*) as count FROM blog_posts WHERE ${whereClause}`)
    .bind(...params)
    .first<{ count: number }>();
  const total = countResult?.count || 0;

  // Get posts with pagination
  const postsResult = await db
    .prepare(
      `SELECT * FROM blog_posts
       WHERE ${whereClause}
       ORDER BY published_at DESC
       LIMIT ? OFFSET ?`
    )
    .bind(...params, pageSize, offset)
    .all<BlogPost>();

  const posts = (postsResult.results || []).map((post) => toDisplayFormat(post));

  return {
    posts,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

/**
 * Get a single blog post by slug
 */
export async function getPostBySlug(
  db: D1Database,
  slug: string
): Promise<BlogPostDisplay | null> {
  const projectId = await getProjectId(db);
  if (!projectId) return null;

  const post = await db
    .prepare(
      `SELECT * FROM blog_posts
       WHERE slug = ? AND project_id = ? AND status = 'published'`
    )
    .bind(slug, projectId)
    .first<BlogPost>();

  if (!post) return null;

  // Get featured image URL if exists
  let mediaUrl: string | undefined;
  if (post.featured_image_id) {
    const media = await db
      .prepare('SELECT r2_key FROM media_files WHERE id = ?')
      .bind(post.featured_image_id)
      .first<{ r2_key: string }>();
    if (media) {
      // R2 bucket public URL - adjust as needed
      mediaUrl = `https://media.techflunkylabs.com/${media.r2_key}`;
    }
  }

  return toDisplayFormat(post, mediaUrl);
}

/**
 * Increment view count for a post
 */
export async function incrementViewCount(
  db: D1Database,
  postId: string
): Promise<void> {
  await db
    .prepare('UPDATE blog_posts SET view_count = view_count + 1 WHERE id = ?')
    .bind(postId)
    .run();
}

/**
 * Get all categories with post counts
 */
export async function getCategories(
  db: D1Database
): Promise<Array<BlogCategory & { postCount: number }>> {
  const projectId = await getProjectId(db);
  if (!projectId) return [];

  const result = await db
    .prepare(
      `SELECT bc.*, COUNT(bp.id) as post_count
       FROM blog_categories bc
       LEFT JOIN blog_post_categories bpc ON bc.id = bpc.category_id
       LEFT JOIN blog_posts bp ON bpc.post_id = bp.id
         AND bp.status = 'published'
         AND bp.project_id = ?
       GROUP BY bc.id
       ORDER BY bc.sort_order, bc.name`
    )
    .bind(projectId)
    .all<BlogCategory & { post_count: number }>();

  return (result.results || []).map((cat) => ({
    ...cat,
    postCount: cat.post_count,
  }));
}

/**
 * Get all tags with post counts
 */
export async function getTags(
  db: D1Database
): Promise<Array<BlogTag & { postCount: number }>> {
  const projectId = await getProjectId(db);
  if (!projectId) return [];

  const result = await db
    .prepare(
      `SELECT bt.*, COUNT(bp.id) as post_count
       FROM blog_tags bt
       LEFT JOIN blog_post_tags bpt ON bt.id = bpt.tag_id
       LEFT JOIN blog_posts bp ON bpt.post_id = bp.id
         AND bp.status = 'published'
         AND bp.project_id = ?
       GROUP BY bt.id
       ORDER BY post_count DESC, bt.name`
    )
    .bind(projectId)
    .all<BlogTag & { post_count: number }>();

  return (result.results || []).map((tag) => ({
    ...tag,
    postCount: tag.post_count,
  }));
}

/**
 * Get related posts for a given post
 * Returns posts in the same category or with similar tags
 */
export async function getRelatedPosts(
  db: D1Database,
  postId: string,
  limit: number = 3
): Promise<BlogPostDisplay[]> {
  const projectId = await getProjectId(db);
  if (!projectId) return [];

  // Get the current post's category and tags
  const currentPost = await db
    .prepare('SELECT category, tags FROM blog_posts WHERE id = ?')
    .bind(postId)
    .first<{ category: string | null; tags: string | null }>();

  if (!currentPost) return [];

  // Find posts with same category, excluding current post
  let relatedPosts: BlogPost[] = [];

  if (currentPost.category) {
    const result = await db
      .prepare(
        `SELECT * FROM blog_posts
         WHERE project_id = ?
           AND status = 'published'
           AND id != ?
           AND category = ?
         ORDER BY published_at DESC
         LIMIT ?`
      )
      .bind(projectId, postId, currentPost.category, limit)
      .all<BlogPost>();
    relatedPosts = result.results || [];
  }

  // If not enough posts from category, get recent posts
  if (relatedPosts.length < limit) {
    const remaining = limit - relatedPosts.length;
    const existingIds = [postId, ...relatedPosts.map((p) => p.id)];
    const placeholders = existingIds.map(() => '?').join(',');

    const result = await db
      .prepare(
        `SELECT * FROM blog_posts
         WHERE project_id = ?
           AND status = 'published'
           AND id NOT IN (${placeholders})
         ORDER BY published_at DESC
         LIMIT ?`
      )
      .bind(projectId, ...existingIds, remaining)
      .all<BlogPost>();

    relatedPosts = [...relatedPosts, ...(result.results || [])];
  }

  return relatedPosts.map((post) => toDisplayFormat(post));
}

/**
 * Search blog posts
 */
export async function searchPosts(
  db: D1Database,
  query: string,
  limit: number = 10
): Promise<BlogPostDisplay[]> {
  const projectId = await getProjectId(db);
  if (!projectId) return [];

  const searchTerm = `%${query}%`;

  const result = await db
    .prepare(
      `SELECT * FROM blog_posts
       WHERE project_id = ?
         AND status = 'published'
         AND (title LIKE ? OR excerpt LIKE ? OR content LIKE ?)
       ORDER BY
         CASE WHEN title LIKE ? THEN 1 ELSE 2 END,
         published_at DESC
       LIMIT ?`
    )
    .bind(projectId, searchTerm, searchTerm, searchTerm, searchTerm, limit)
    .all<BlogPost>();

  return (result.results || []).map((post) => toDisplayFormat(post));
}

/**
 * Get recent posts for sidebar/footer
 */
export async function getRecentPosts(
  db: D1Database,
  limit: number = 5
): Promise<BlogPostDisplay[]> {
  const projectId = await getProjectId(db);
  if (!projectId) return [];

  const result = await db
    .prepare(
      `SELECT * FROM blog_posts
       WHERE project_id = ? AND status = 'published'
       ORDER BY published_at DESC
       LIMIT ?`
    )
    .bind(projectId, limit)
    .all<BlogPost>();

  return (result.results || []).map((post) => toDisplayFormat(post));
}

/**
 * Get popular posts by view count
 */
export async function getPopularPosts(
  db: D1Database,
  limit: number = 5
): Promise<BlogPostDisplay[]> {
  const projectId = await getProjectId(db);
  if (!projectId) return [];

  const result = await db
    .prepare(
      `SELECT * FROM blog_posts
       WHERE project_id = ? AND status = 'published'
       ORDER BY view_count DESC
       LIMIT ?`
    )
    .bind(projectId, limit)
    .all<BlogPost>();

  return (result.results || []).map((post) => toDisplayFormat(post));
}
