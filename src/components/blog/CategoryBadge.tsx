import { Folder } from 'lucide-react';

interface CategoryBadgeProps {
  category: string;
  linked?: boolean;
  size?: 'sm' | 'md';
}

export default function CategoryBadge({
  category,
  linked = true,
  size = 'sm',
}: CategoryBadgeProps) {
  const sizeClasses = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-1.5 text-sm',
  };

  const content = (
    <>
      <Folder className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      {category}
    </>
  );

  if (linked) {
    return (
      <a
        href={`/blog/category/${encodeURIComponent(category.toLowerCase())}`}
        className={`inline-flex items-center gap-1.5 ${sizeClasses[size]} bg-[#e0ff00]/10 text-[#e0ff00] font-medium rounded-full hover:bg-[#e0ff00]/20 transition-colors`}
      >
        {content}
      </a>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${sizeClasses[size]} bg-[#e0ff00]/10 text-[#e0ff00] font-medium rounded-full`}
    >
      {content}
    </span>
  );
}
