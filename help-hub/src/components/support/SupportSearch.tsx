import { Search, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { searchHelp, HelpItem } from "@/lib/search";

const SupportSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<HelpItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      setIsSearching(true);
      // Debounce search to avoid too many calls
      const timeoutId = setTimeout(() => {
        const searchResults = searchHelp(query);
        setResults(searchResults);
        setIsSearching(false);
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled in useEffect
  };

  return (
    <div className="py-16 md:py-20 text-center">
      <h1 className="text-[40px] md:text-[48px] font-normal text-foreground mb-10 leading-tight">
        Hi, how can we help?
      </h1>

      <div className="max-w-[700px] mx-auto">
        <form onSubmit={handleSubmit} className="relative mb-8">
          <input
            type="text"
            placeholder="Search for solutions"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-[14px] pr-12 text-[15px] bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-muted-foreground shadow-sm"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Search className="w-5 h-5 text-muted-foreground" />
          </div>
        </form>

        {/* Search Results */}
        {query.trim() && (
          <div className="text-left bg-card border border-border rounded-xl shadow-sm max-h-[400px] overflow-y-auto">
            {isSearching ? (
              <div className="p-6 text-center text-muted-foreground">
                Searching...
              </div>
            ) : results.length > 0 ? (
              <div className="divide-y divide-border">
                {results.map((item) => (
                  <Link
                    key={item.id}
                    to={`/${item.type === "article" ? "article" : "topic"}/${item.slug}`}
                    className="block p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground mb-1 line-clamp-2">
                          {item.question}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {item.content.substring(0, 100)}...
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 ml-2 mt-1" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                No results found for "{query}"
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportSearch;
