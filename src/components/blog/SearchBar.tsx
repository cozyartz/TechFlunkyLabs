import { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  initialQuery?: string;
  placeholder?: string;
}

export default function SearchBar({
  initialQuery = '',
  placeholder = 'Search posts...',
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        window.location.href = `/blog/search?q=${encodeURIComponent(query.trim())}`;
      }
    },
    [query]
  );

  const handleClear = useCallback(() => {
    setQuery('');
  }, []);

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-10 py-3 bg-surface-900 border border-surface-700 rounded-xl text-white placeholder:text-surface-500 focus:outline-none focus:border-[#e0ff00]/50 focus:ring-1 focus:ring-[#e0ff00]/20 transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-500 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
}
