import React, { useEffect, useRef, useCallback } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

/**
 * Accessible full-screen search overlay.
 * Props:
 *  open: boolean
 *  onClose: () => void
 *  initialQuery?: string
 *  onSearch?: (q: string) => void (optional custom handler)
 */
export default function SearchOverlay({
  open,
  onClose,
  initialQuery = "",
  onSearch,
}) {
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const [query, setQuery] = React.useState(initialQuery);
  const navigate = useNavigate();

  // Sync with prop if it changes
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const performSearch = useCallback(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      onClose();
      return;
    }
    if (onSearch) {
      onSearch(trimmed);
    } else {
      navigate(`/catalogue?search=${encodeURIComponent(trimmed)}`);
    }
    onClose();
  }, [query, onSearch, navigate, onClose]);

  // Key & focus management
  useEffect(() => {
    if (open) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      // Slight delay to ensure mount
      setTimeout(() => {
        inputRef.current && inputRef.current.focus();
      }, 0);
      const keyHandler = (e) => {
        if (e.key === "Escape") {
          e.stopPropagation();
          onClose();
        } else if (e.key === "Enter") {
          performSearch();
        }
      };
      window.addEventListener("keydown", keyHandler);
      return () => {
        window.removeEventListener("keydown", keyHandler);
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [open, performSearch, onClose]);

  // Outside click close
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        onClose();
      }
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site search"
      className="fixed inset-0 z-[130] flex flex-col bg-black/60 backdrop-blur-xl animate-fade-in"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />
      <div className="flex justify-end p-4 md:p-6">
        <button
          onClick={onClose}
          aria-label="Close search"
          className="p-2 md:p-3 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
        >
          <CloseIcon fontSize="medium" />
        </button>
      </div>
      <div className="flex-1 flex items-start md:items-center justify-center px-4 md:px-8 pb-12 md:pb-24">
        <div ref={containerRef} className="w-full max-w-2xl mx-auto relative">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              performSearch();
            }}
            className="group shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_32px_-4px_rgba(0,0,0,0.45)] rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/15 focus-within:border-white/30 transition-colors"
          >
            <div className="flex items-center gap-3 px-4 md:px-5 py-3 md:py-4">
              <SearchIcon className="text-white/80 group-focus-within:text-white" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, artisans, regions..."
                className="flex-1 bg-transparent outline-none border-none text-base md:text-lg text-white placeholder:text-white/40"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                  className="px-2 py-1 text-xs font-medium uppercase tracking-wide text-white/60 hover:text-white hover:bg-white/10 rounded-md"
                >
                  Clear
                </button>
              )}
              <kbd className="hidden md:inline-flex text-[10px] font-semibold tracking-wide px-2 py-1 rounded-md bg-white/10 text-white/60 border border-white/15">
                /
              </kbd>
            </div>
            <div className="px-4 md:px-5 pb-4 md:pb-5">
              <p className="text-[11px] md:text-xs uppercase tracking-wider text-white/40">
                Press Enter to search · Esc to close
              </p>
            </div>
          </form>
          {query.length === 0 && (
            <div className="mt-6 md:mt-8 grid gap-3 md:gap-4 text-white/70 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white/30" />
                Try searching for “Rugs”
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white/30" />
                Explore “Handicraft Items”
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white/30" />
                Discover artisans by region
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
