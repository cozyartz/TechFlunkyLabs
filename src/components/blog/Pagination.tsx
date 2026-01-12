import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath = '/blog',
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => {
    if (page === 1) return basePath;
    return `${basePath}?page=${page}`;
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('ellipsis');
      }

      // Show pages around current
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis');
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination">
      {/* Previous */}
      <a
        href={currentPage > 1 ? getPageUrl(currentPage - 1) : undefined}
        className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          currentPage === 1
            ? 'text-surface-600 cursor-not-allowed'
            : 'text-surface-300 hover:text-[#e0ff00] hover:bg-surface-800'
        }`}
        aria-disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </a>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) =>
          page === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-surface-500">
              ...
            </span>
          ) : (
            <a
              key={page}
              href={getPageUrl(page)}
              className={`min-w-[40px] h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                page === currentPage
                  ? 'bg-[#e0ff00] text-black'
                  : 'text-surface-300 hover:text-[#e0ff00] hover:bg-surface-800'
              }`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </a>
          )
        )}
      </div>

      {/* Next */}
      <a
        href={currentPage < totalPages ? getPageUrl(currentPage + 1) : undefined}
        className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          currentPage === totalPages
            ? 'text-surface-600 cursor-not-allowed'
            : 'text-surface-300 hover:text-[#e0ff00] hover:bg-surface-800'
        }`}
        aria-disabled={currentPage === totalPages}
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </a>
    </nav>
  );
}
