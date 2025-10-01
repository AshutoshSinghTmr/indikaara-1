import React from "react";
import { useParams, Link } from "react-router-dom";

/**
 * Generic Coming Soon page used for unfinished verticals / categories.
 * Displays a human-friendly title based on slug and a short message.
 */
export default function ComingSoonPage() {
  const { slug } = useParams();
  const title = (slug || "")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <main className="min-h-screen pt-24 md:pt-28 lg:pt-32 pb-20 flex flex-col items-center justify-start bg-background text-primary px-4 md:px-8">
      {/* Hero Banner */}
      <div className="w-full mb-14 max-w-6xl">
        <div className="relative overflow-hidden rounded-2xl border border-red-700/30 bg-gradient-to-br from-red-900/50 via-gray-900/40 to-black/60 backdrop-blur-sm py-12 md:py-16 text-center shadow-lg shadow-black/40">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ff4d4f] via-[#ff8f59] to-[#ffd166] drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
            Coming Soon...
          </h2>
          <p className="mt-6 max-w-4xl mx-auto text-base md:text-lg lg:text-xl text-white/70 font-medium leading-relaxed px-6">
            We're actively building this experience to bring you curated
            collections, authentic sourcing details, and impact-driven
            storytelling. Sign up below to be the first to explore {title} when
            it launches.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 px-4">
            <span className="px-4 py-1.5 rounded-full bg-white/10 text-white/70 text-[10px] md:text-xs tracking-wide border border-white/10 uppercase">
              Early Access
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white/10 text-white/70 text-[10px] md:text-xs tracking-wide border border-white/10 uppercase">
              Ethical Sourcing
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white/10 text-white/70 text-[10px] md:text-xs tracking-wide border border-white/10 uppercase">
              Heritage Craft
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white/10 text-white/70 text-[10px] md:text-xs tracking-wide border border-white/10 uppercase">
              Impact Metrics
            </span>
          </div>
          <div className="pointer-events-none absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_25%_40%,rgba(255,255,255,0.08),transparent_65%)] after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_75%_60%,rgba(255,255,255,0.06),transparent_60%)]" />
        </div>
      </div>
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          {title}
        </h1>
        <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10">
          We are crafting this experience. Our team is working with artisans and
          supply partners to bring this category live soon. Stay tuned for
          authentic, responsibly sourced products.
        </p>
        <div className="bg-gray-800/50 rounded-2xl p-8 md:p-12 border border-white/10 shadow-xl">
          <p className="text-text-secondary mb-6">
            Want to be notified when we launch?
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks! You will be notified at launch.");
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <input
              required
              type="email"
              placeholder="you@example.com"
              className="px-5 py-3 rounded-full bg-gray-900/60 border border-white/10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/60 flex-1 min-w-[220px]"
            />
            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow"
            >
              Notify Me
            </button>
          </form>
        </div>
        <div className="mt-12 flex flex-wrap gap-4 justify-center text-sm">
          <Link to="/" className="text-primary hover:underline">
            Return Home
          </Link>
          <span className="text-white/30">•</span>
          <Link to="/catalogue" className="text-primary hover:underline">
            Browse Catalogue
          </Link>
        </div>
      </div>
    </main>
  );
}
