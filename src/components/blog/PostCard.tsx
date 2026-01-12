import { motion } from 'framer-motion';
import { Clock, Eye, Calendar, ArrowRight } from 'lucide-react';
import type { BlogPostDisplay } from '../../lib/blog/types';

interface PostCardProps {
  post: BlogPostDisplay;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group ${featured ? 'col-span-full' : ''}`}
    >
      <a
        href={`/blog/${post.slug}`}
        className={`block bg-surface-900 border border-surface-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#e0ff00]/30 hover:shadow-[0_0_30px_rgba(224,255,0,0.1)] ${
          featured ? 'md:grid md:grid-cols-2 md:gap-8' : ''
        }`}
      >
        {/* Featured Image */}
        {post.featuredImage && (
          <div className={`relative overflow-hidden ${featured ? 'aspect-[16/10] md:aspect-auto' : 'aspect-video'}`}>
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {post.category && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-sm text-[#e0ff00] text-xs font-medium rounded-full">
                {post.category}
              </span>
            )}
          </div>
        )}

        {/* Content */}
        <div className={`p-6 ${featured ? 'md:p-8 md:flex md:flex-col md:justify-center' : ''}`}>
          {/* Category badge if no image */}
          {!post.featuredImage && post.category && (
            <span className="inline-block mb-3 px-3 py-1 bg-surface-800 text-[#e0ff00] text-xs font-medium rounded-full">
              {post.category}
            </span>
          )}

          <h2
            className={`font-bold text-white group-hover:text-[#e0ff00] transition-colors leading-tight ${
              featured ? 'text-2xl md:text-3xl mb-4' : 'text-xl mb-3'
            }`}
          >
            {post.title}
          </h2>

          {post.excerpt && (
            <p className={`text-surface-400 line-clamp-3 ${featured ? 'text-base md:text-lg mb-6' : 'text-sm mb-4'}`}>
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-surface-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime} min read
            </span>
            {post.viewCount > 0 && (
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                {post.viewCount.toLocaleString()} views
              </span>
            )}
          </div>

          {/* Read more */}
          <div className="mt-4 flex items-center gap-2 text-[#e0ff00] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Read article
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </a>
    </motion.article>
  );
}
