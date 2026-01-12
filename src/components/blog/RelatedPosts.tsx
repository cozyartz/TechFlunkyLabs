import { ArrowRight } from 'lucide-react';
import type { BlogPostDisplay } from '../../lib/blog/types';

interface RelatedPostsProps {
  posts: BlogPostDisplay[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-surface-800">
      <h2 className="text-2xl font-bold text-white mb-8">Related Posts</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <a
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block p-6 bg-surface-900 border border-surface-800 rounded-xl hover:border-[#e0ff00]/30 transition-all"
          >
            <h3 className="font-semibold text-white group-hover:text-[#e0ff00] transition-colors line-clamp-2 mb-2">
              {post.title}
            </h3>

            {post.excerpt && (
              <p className="text-sm text-surface-400 line-clamp-2 mb-4">
                {post.excerpt}
              </p>
            )}

            <div className="flex items-center gap-2 text-[#e0ff00] text-sm font-medium">
              Read more
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
