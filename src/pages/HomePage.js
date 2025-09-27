import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import ArtisanStorySection from "../components/ArtisanStorySection";
import CategoryCarousel from "../components/CategoryCarousel";
import FeaturedArtisan from "../components/FeaturedArtisan";
import dataService from "../data/dataService";

import {
  CheckCircleOutline,
  Public,
  Handshake,
  Palette,
} from "@mui/icons-material";
/**
 * HomePage
 * --------------------------------------------------------------------------
 * Purpose:
 * - Acts as the primary landing page for Indikaara.
 * - Composes major homepage sections: Hero carousel, Brand Story, Brand Values,
 *   Category discovery grid, and a Featured Artisan highlight.
 *
 * Data Flow:
 * - Synchronously imports presentational components.
 * - On mount, fetches category metadata from dataService (local JSON layer),
 *   derives product counts per category, and stores a denormalized array of
 *   category items for rendering the discovery grid.
 *
 * Routing/Navigation:
 * - Leverages React Router's useNavigate to deep-link into Catalogue with a
 *   category query param (e.g., /catalogue?category=rugs).
 *
 * Accessibility & Semantics:
 * - Wraps page content in a <main role="main"> landmark for screen readers.
 * - Section headings use id/aria-labelledby pairs to improve nav and announce.
 *
 * Responsiveness:
 * - Tailwind utility classes drive spacing/typography per breakpoint.
 * - Hero and Brand Story are full-width; content sections are constrained to a
 *   max width container for readability.
 *
 * Performance Considerations:
 * - Simple client-side mapping; no eager network calls beyond dataService.
 * - Minimal state; derived props computed once on load.
 */
const Card = ({ icon: Icon, title, description }) => (
  <div className="min-w-xl min-h-2xl bg-gray-100 p-6 rounded-2xl flex items-start space-x-4 shadow-sm transition-transform transform hover:scale-105">
    <div className="flex-shrink">
      <Icon className="text-orange-600" style={{ fontSize: "2rem" }} />
    </div>
    <div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  </div>
);
const HomePage = () => {
  const navigate = useNavigate();

  // State: list of category objects projected for the grid. Each item shape:
  // { id: string|number, title: string, image: string, link: string, count: number }
  const [categories, setCategories] = useState([]);

  // State: simple UI flag to guard content rendering while computing/collecting data.
  const [loading, setLoading] = useState(true);

  // Effect: bootstrap page data (categories) once on initial mount.
  // - Reads raw categories from dataService
  // - Computes product counts per category (via dataService.getProductsByCategory)
  // - Normalizes underscore_names to human titles
  // - Stores result and clears loading
  useEffect(() => {
    const loadData = async () => {
      try {
        // Source category metadata (local JSON-backed service)
        const categoriesData = dataService.getAllCategories();

        // Enrich with computed product counts and friendly titles
        const categoriesWithCount = categoriesData.map((category) => {
          const productCount = dataService.getProductsByCategory(
            category.name
          ).length;
          return {
            id: category.id,
            // Transform snake_case to Title Case friendly label for display
            title: category.name.replace(/_/g, " "),
            image: category.image,
            link: `/categories/${category.id}`,
            count: productCount,
          };
        });

        setCategories(categoriesWithCount);
        setLoading(false);
      } catch (error) {
        // Defensive: ensure UI continues rendering even if data fails
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handler: when a category tile is clicked, navigate to Catalogue filtered
  // by category. We normalize the title to a compact param (lowercase, no spaces)
  // e.g., "Vintage Rugs" -> /catalogue?category=vendagerugs
  const handleCategoryClick = (category) => {
    console.log(`Category clicked: ${category.title}`);

    const categoryParam = category.title.toLowerCase().replace(/\s+/g, "");
    navigate(`/catalogue?category=${categoryParam}`);
  };

  // NOTE (Future): Regions discovery section
  // The regions block is intentionally disabled. To re-enable:
  // - Add `const [regions, setRegions] = useState([])` state
  // - Populate via dataService.getAllRegions() (shape: id, title, image, link)
  // - Render a grid of CategoryCard with onClick navigating similarly to categories
  // - Ensure aria-labelledby+heading structure mirrors other sections

  return (
    <main role="main">
      {/* HERO: Full-bleed carousel with slides, text overlays, and nav dots.
          - Composed in HeroSection
          - Visually anchors the page and sets brand tone
          - Full-viewport width irrespective of container constraints */}
      <HeroSection />
      {/* BRAND STORY: Full-width storytelling band directly under hero.
          - Provides short narrative of brand ethos
          - Has a soft gradient background for separation without heavy contrast
          - Center-constrained text for readability */}
      {/* <section
        className="relative py-6 md:py-5 bg-black text-white"
        aria-labelledby="brand-story"
      >
        <div className="container mx-auto max-w-4xl">
          <div className="text-text-primary text-sm md:text-l leading-relaxed text-center">
            <span
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "2rem",
                fontWeight: "400",
                color: "var(--accent-color)",
              }}
            >
              Every piece tells a tale.....
            </span>
            <p
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "1rem",
                fontWeight: "300",
                marginTop: "0.4rem",
                fontStyle: "italic",
              }}
            >
              Our handpicked collection of unique rugs, vintage finds, and
              beautiful decor is here to help you create a home that feels
              uniquely you. We've traveled to find the perfect blend of warmth
              and character, so you can fill your space with items that bring
              you joy and comfort.
            </p>
          </div>
        </div>
      </section> */}

      {/* Glassy Gradient Transition */}
      {/* <div className="h-28 bg-gradient-to-b from-black via-black/70 to-white/95 backdrop-blur-md opacity-100"></div> */}

      {/* What We Do Section */}
      {/* <div className="h-14 bg-gradient-to-b from-white via-white/70 to-gray-900 backdrop-blur-md"></div> */}
      <section>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
          <div className="w-full bg-white p-6 sm:p-8 lg:p-12 rounded-3xl shadow-2xl text-center">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
              Why Connect with{" "}
              <span className="text-orange-600">Indikaara?</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              We are a bridge between the world and India's finest artisans,
              fostering a community built on authenticity, empowerment, and a
              shared love for timeless craft.
            </p>

            <div className="flex flex-row space-y-2 md:flex-row sm:flex-col space-x-2 text-left">
              <Card
                icon={CheckCircleOutline}
                title="Authenticity Guaranteed"
                description="Every piece tells a story, sourced directly from master craftspeople across India."
              />
              <Card
                icon={Public}
                title="Global Reach & Visibility"
                description="We showcase your unique creations to a global audience passionate about genuine artistry."
              />
              <Card
                icon={Handshake}
                title="Empowering Artisans"
                description="Our model ensures fair compensation, sustaining livelihoods and preserving heritage."
              />
              <Card
                icon={Palette}
                title="Diverse Art Forms"
                description="Explore a rich tapestry of textiles, pottery, jewelry, and more from every corner of India."
              />
            </div>

            <div className="bg-orange-50 p-6 sm:p-8 rounded-2xl mt-10">
              <p className="italic text-gray-700 leading-relaxed text-sm sm:text-base">
                "Indikaara didn't just sell my art; they shared my story. It's a
                partnership that honors my craft and my heritage."
              </p>
              <p className="mt-3 font-semibold text-gray-800">
                - A. Kumar, Weaver from Varanasi
              </p>
            </div>

            <button
              onClick={() => (window.location.href = "/blog")}
              className="mt-10 w-full px-6 py-4 bg-orange-600 text-white font-bold rounded-full text-lg shadow-xl transition-all hover:bg-orange-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50"
            >
              Join Our Artisan Community
            </button>
          </div>
        </div>
      </section>
      {/* MAIN CONTENT CONTAINER: constrains reading width for dense sections */}
      <div className="container mx-auto max-w-7xl px-4 py-4">
        {/* FOUNDATION PREVIEW: Brief introduction with link to dedicated page */}
        <section
          className="pt-8 mb-22 border-b border-green-500 bg-gray-900"
          aria-labelledby="foundation-preview"
        >
          <div className="text-center mb-12">
            <h2
              id="foundation-preview"
              className="text-4xl font-bold text-primary m-auto mb-3"
            >
              Our Foundation
            </h2>
            <p className="text-text-secondary text-lg mb-6">
              The values that guide our journey in preserving Indian
              craftsmanship
            </p>
            <a
              href="/foundation"
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Learn More About Our Mission
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </section>

        {/* Loading gate: keeps layout stable while category data is prepared. */}
        {loading ? (
          <div className="flex justify-center items-center min-h-64">
            <div className="text-primary text-xl">Loading...</div>
          </div>
        ) : (
          <>
            {/* CATEGORY DISCOVERY CAROUSEL
                - A beautiful carousel of CategoryCard tiles enabling quick nav.
                - Auto-scrolling with navigation controls and responsive design
                - Keyed by stable category id; click navigates to Catalogue with
                  a category query param. */}
            <section className="mt-16" aria-labelledby="categories-title">
              <div className="mb-12 text-center">
                <h2
                  id="categories-title"
                  className="text-4xl font-bold text-primary mb-3"
                >
                  Shop by Category
                </h2>
                <p className="text-text-secondary text-lg">
                  Discover authentic Indian handicrafts by category
                </p>
              </div>

              <CategoryCarousel
                categories={categories}
                onCategoryClick={handleCategoryClick}
              />
            </section>
            {/* ARTISAN STORY: Compelling section with scrolling banner and powerful messaging
          - Highlights the authentic craftsmanship narrative
          - Features scrolling text banner with key values
          - Call-to-action to explore artisan stories */}
            <section
              className="artisan-story-section"
              style={{ marginTop: "4rem" }}
            >
              <ArtisanStorySection />
            </section>
            {/* FEATURED ARTISAN: spotlight module highlighting a maker/story. */}
            <FeaturedArtisan />
          </>
        )}
      </div>
    </main>
  );
};

export default HomePage;
