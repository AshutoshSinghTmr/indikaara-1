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
  Recycling,
} from "@mui/icons-material";

const Card = ({ icon: Icon, title, description, highlight }) => (
  <div
    className={
      `why-card h-full opacity-0 translate-y-6 group relative p-6 rounded-2xl flex flex-col shadow-sm transition-all duration-500 ease-out ` +
      (highlight
        ? "bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 border border-orange-300/60 shadow-[0_4px_18px_-4px_rgba(255,140,0,0.35)] hover:shadow-[0_6px_24px_-4px_rgba(255,140,0,0.45)] hover:-translate-y-1"
        : "bg-gray-100/90 hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md")
    }
    tabIndex={0}
  >
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <Icon
          className={
            highlight
              ? "text-orange-600 drop-shadow-md"
              : "text-orange-600 drop-shadow-sm"
          }
          style={{ fontSize: "2rem" }}
        />
      </div>
      <div className="flex-1">
        <h3
          className={`text-lg sm:text-xl font-semibold tracking-wide ${
            highlight ? "text-orange-700" : "text-gray-800"
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-2 text-sm sm:text-base leading-relaxed ${
            highlight ? "text-orange-800/80" : "text-gray-600"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
    {highlight && (
      <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow">
        Featured
      </span>
    )}
  </div>
);
const HomePage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Card data for Why Connect section
  const whyCards = [
    {
      icon: Recycling,
      title: "Waste to Product Innovation",
      description:
        "Upcycling textile remnants, metal offcuts & organic by‑products into new collections — reducing landfill impact while celebrating circular design.",
      highlight: true,
    },
    {
      icon: CheckCircleOutline,
      title: "Authenticity Guaranteed",
      description:
        "Every piece tells a story, sourced directly from master craftspeople across India.",
    },
    {
      icon: Public,
      title: "Global Reach & Visibility",
      description:
        "We showcase your unique creations to a global audience passionate about genuine artistry.",
    },
    {
      icon: Handshake,
      title: "Empowering Artisans",
      description:
        "Our model ensures fair compensation, sustaining livelihoods and preserving heritage.",
    },
    {
      icon: Palette,
      title: "Diverse Art Forms",
      description:
        "Explore a rich tapestry of textiles, pottery, jewelry, and more from every corner of India.",
    },
    {
      icon: Handshake,
      title: "Circular Supply Chain",
      description:
        "Collaborating across sourcing, production & logistics to minimize waste, repurpose by‑products and shorten material loops.",
    },
  ];

  const WhyConnectCards = () => {
    useEffect(() => {
      const cards = document.querySelectorAll(".why-card");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("!opacity-100", "!translate-y-0");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      cards.forEach((c, idx) => {
        c.style.transitionDelay = `${idx * 80}ms`;
        observer.observe(c);
      });
      return () => observer.disconnect();
    }, []);
    return (
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 text-left items-stretch">
        {whyCards.map((c) => (
          <Card key={c.title} {...c} />
        ))}
      </div>
    );
  };

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

  const handleCategoryClick = (category) => {
    const categoryParam = category.title.toLowerCase().replace(/\s+/g, "");
    navigate(`/catalogue?category=${categoryParam}`);
  };

  return (
    <main role="main">
      {/* HERO: Full-bleed carousel with slides, text overlays, and nav dots. */}
      <HeroSection />
      {/* WHY INDIKAARA: Key value props for artisans, compelling CTA */}
      <section>
        <div className="min-h-[580px] sm:min-h-[620px] lg:min-h-screen bg-gray-50 flex items-start sm:items-center justify-center p-3 sm:p-6 lg:p-8 font-sans">
          <div className="w-full bg-white p-4 sm:p-7 lg:p-12 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl text-center max-w-6xl mx-auto">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-gray-800 mb-3 leading-tight">
              Why Connect with{" "}
              <span className="text-orange-600">Indikaara?</span>
            </h1>
            <p className="text-sm xs:text-base sm:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8">
              We are a bridge between the world and India's finest artisans,
              fostering a community built on authenticity, empowerment, and a
              shared love for timeless craft.
            </p>

            {/* Why Connect Cards with highlight + reveal animation */}
            <WhyConnectCards />

            <div className="bg-orange-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl mt-8 sm:mt-10">
              <p className="italic text-gray-700 leading-relaxed text-xs sm:text-sm">
                "Indikaara didn't just sell my art; they shared my story. It's a
                partnership that honors my craft and my heritage."
              </p>
              <p className="mt-2 sm:mt-3 font-semibold text-gray-800 text-xs sm:text-sm">
                - A. Kumar, Weaver from Varanasi
              </p>
            </div>

            <button
              onClick={() => (window.location.href = "/blog")}
              className="mt-8 sm:mt-10 w-full px-5 py-3 sm:px-6 sm:py-4 bg-orange-600 text-white font-bold rounded-full text-base sm:text-lg shadow-lg sm:shadow-xl transition-all hover:bg-orange-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50"
            >
              Join Our Artisan Community
            </button>
          </div>
        </div>
      </section>
      {/* MAIN CONTENT AREA (now full-width) */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        {/* FOUNDATION PREVIEW: Brief introduction with link to dedicated page */}
        <section
          className="pt-8 mb-22 border-b border-green-500 bg-gray-900 w-full"
          aria-labelledby="foundation-preview"
        >
          <div className="text-center mb-12 max-w-6xl mx-auto">
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
            {/* CATEGORY CAROUSEL: Horizontally scrollable category cards with images and counts */}
            {/* <section className="my-16 text-center">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Featured Categories
              </h2>
              <p className="text-text-secondary text-lg">
                Explore our curated selection of categories
              </p>
            </section> */}
            <section
              className="mt-16 w-full"
              aria-labelledby="categories-title"
            >
              <div className="mb-12 text-center max-w-6xl mx-auto">
                <h2
                  id="categories-title"
                  className="text-4xl font-bold text-primary mb-3"
                >
                  Explore by Category
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
            {/* ARTISAN STORY: narrative section with image/text split, link to blog */}
            <section
              className="artisan-story-section w-full"
              style={{ marginTop: "4rem" }}
            >
              <ArtisanStorySection />
            </section>
            {/* FEATURED ARTISAN: spotlight module highlighting a maker/story. */}
            <section className="w-full">
              <FeaturedArtisan />
            </section>
            {/* QUALITY & SUSTAINABILITY: Icon grid highlighting key values */}
            <section className="my-10 w-full">
              <div className="bg-[#111827] rounded-none sm:rounded-xl p-6 sm:p-8 md:p-12 w-full">
                <div className="text-center mb-10 sm:mb-12">
                  <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4">
                    Quality & Sustainability
                  </h2>
                  <p className="text-text-secondary text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
                    Our commitment goes beyond beautiful products. We ensure
                    every piece meets the highest standards while supporting
                    sustainable practices and fair trade.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                  <div className="text-center px-1">
                    <div className="bg-green-600/20 text-green-400 w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <svg
                        className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-primary mb-1 sm:mb-2">
                      Quality Assured
                    </h3>
                    <p className="text-text-secondary text-xs sm:text-sm md:text-base">
                      Every piece undergoes rigorous quality checks
                    </p>
                  </div>

                  <div className="text-center px-1">
                    <div className="bg-blue-600/20 text-blue-400 w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <svg
                        className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                        />
                      </svg>
                    </div>
                    <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-primary mb-1 sm:mb-2">
                      Sustainable
                    </h3>
                    <p className="text-text-secondary text-xs sm:text-sm md:text-base">
                      Eco-friendly materials and processes
                    </p>
                  </div>

                  <div className="text-center px-1">
                    <div className="bg-purple-600/20 text-purple-400 w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <svg
                        className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-primary mb-1 sm:mb-2">
                      Fair Trade
                    </h3>
                    <p className="text-text-secondary text-xs sm:text-sm md:text-base">
                      Direct partnerships with artisan communities
                    </p>
                  </div>

                  <div className="text-center px-1">
                    <div className="bg-orange-600/20 text-orange-400 w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <svg
                        className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-primary mb-1 sm:mb-2">
                      Authentic
                    </h3>
                    <p className="text-text-secondary text-xs sm:text-sm md:text-base">
                      Genuine traditional craftsmanship guaranteed
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
        {/* OUR CERTIFICATIONS: credibility logos displayed above footer */}
        <section
          aria-labelledby="certifications-title"
          className="mt-24 mb-12 w-full"
        >
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2
                id="certifications-title"
                className="text-3xl md:text-4xl font-bold text-primary mb-4"
              >
                Our Certifications
              </h2>
              <p className="text-text-secondary text-base md:text-lg max-w-3xl mx-auto">
                Recognitions and compliance frameworks that reflect our
                commitment to quality, transparency, and ethical global trade.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6 items-center w-full">
              {[
                {
                  file: require("../assets/certifications/EPC-logo.png"),
                  alt: "EPC",
                },
                {
                  file: require("../assets/certifications/ISO-logo.png"),
                  alt: "ISO",
                },
                {
                  file: require("../assets/certifications/IEC-logo.webp"),
                  alt: "IEC",
                },
                {
                  file: require("../assets/certifications/GST-logo.webp"),
                  alt: "GST",
                },
              ].map((c, idx) => (
                <div
                  key={c.alt}
                  className="group relative flex items-center justify-center rounded-lg bg-[#191919]/80 backdrop-blur-sm aspect-square p-2 sm:p-3 lg:p-4 border border-white/10 shadow-sm hover:shadow-md hover:border-white/20 transition-all duration-300 overflow-hidden max-w-[120px] sm:max-w-[140px] lg:max-w-[160px] mx-auto"
                >
                  <img
                    src={c.file}
                    alt={`${c.alt} Certification`}
                    className="w-full h-full object-contain opacity-85 group-hover:opacity-100 transition-opacity duration-300 scale-95 group-hover:scale-100"
                    loading="lazy"
                  />
                  <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-orange-400 via-pink-400 to-yellow-300 transition-opacity duration-300 mix-blend-multiply" />
                  <span className="sr-only">{c.alt} certification logo</span>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <p className="text-xs uppercase tracking-wider text-text-secondary/60">
                Independently verified | Trade & Quality Compliance
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
