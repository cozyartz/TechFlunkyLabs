/**
 * Blog types for TechFlunky Labs
 * These types mirror the D1 database schema from astro-crm
 */

export interface BlogPost {
  id: string;
  author_id: string | null;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image_id: string | null;
  status: 'draft' | 'pending_review' | 'scheduled' | 'published' | 'archived';
  ai_generated: boolean;
  ai_model: string | null;
  category: string | null;
  tags: string | null; // JSON array
  meta_description: string | null;
  meta_keywords: string | null;
  canonical_url: string | null;
  scheduled_for: string | null;
  published_at: string | null;
  view_count: number;
  created_at: string;
  updated_at: string;
  project_id: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parent_id: string | null;
  sort_order: number;
  created_at: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface MediaFile {
  id: string;
  filename: string;
  file_type: string;
  r2_key: string;
  visibility: 'public' | 'private';
  thumbnail_url: string | null;
}

// Parsed/enriched types for display
export interface BlogPostDisplay {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  category: string | null;
  tags: string[];
  metaDescription: string | null;
  publishedAt: string | null;
  readingTime: number; // in minutes
  viewCount: number;
  authorName: string;
  isAiGenerated: boolean;
}

export interface BlogListResponse {
  posts: BlogPostDisplay[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface BlogFilters {
  category?: string;
  tag?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}
