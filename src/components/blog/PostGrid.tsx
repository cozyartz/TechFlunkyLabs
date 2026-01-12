import PostCard from './PostCard';
import type { BlogPostDisplay } from '../../lib/blog/types';

interface PostGridProps {
  posts: BlogPostDisplay[];
  featuredFirst?: boolean;
}

export default function PostGrid({ posts, featuredFirst = true }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-surface-400 text-lg">No posts found.</p>
      </div>
    );
  }

  const [firstPost, ...restPosts] = posts;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {featuredFirst && firstPost && (
        <PostCard post={firstPost} featured />
      )}
      {featuredFirst ? (
        restPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))
      )}
    </div>
  );
}
