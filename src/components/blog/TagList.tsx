import { Tag } from 'lucide-react';

interface TagListProps {
  tags: string[];
  linked?: boolean;
}

export default function TagList({ tags, linked = true }: TagListProps) {
  if (tags.length === 0) return null;

  if (linked) {
    return (
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <a
            key={tag}
            href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-800 text-surface-300 text-sm rounded-full hover:bg-surface-700 hover:text-[#e0ff00] transition-colors"
          >
            <Tag className="w-3 h-3" />
            {tag}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-800 text-surface-400 text-sm rounded-full"
        >
          <Tag className="w-3 h-3" />
          {tag}
        </span>
      ))}
    </div>
  );
}
