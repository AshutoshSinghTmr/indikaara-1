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

const Card = ({ icon: Icon, title, description }) => (
  <div className="min-w-2xl min-h-2xl bg-gray-100 p-6 rounded-2xl flex items-start space-x-4 shadow-sm transition-transform">
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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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

            <div className="flex flex-row flex-wrap space-y-2 space-x-2 text-left justify-center">
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
            {/* CATEGORY CAROUSEL: Horizontally scrollable category cards with images and counts */}
            {/* <section className="my-16 text-center">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Featured Categories
              </h2>
              <p className="text-text-secondary text-lg">
                Explore our curated selection of categories
              </p>
            </section> */}
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
            {/* ARTISAN STORY: narrative section with image/text split, link to blog */}
            <section
              className="artisan-story-section"
              style={{ marginTop: "4rem" }}
            >
              <ArtisanStorySection />
            </section>
            {/* FEATURED ARTISAN: spotlight module highlighting a maker/story. */}
            <section>
              <FeaturedArtisan />
            </section>
            {/* QUALITY & SUSTAINABILITY: Icon grid highlighting key values */}
            <section className="my-10">
              <div className="bg-[#111827] rounded-xl p-8 md:p-12">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-primary mb-4">
                    Quality & Sustainability
                  </h2>
                  <p className="text-text-secondary text-lg max-w-3xl mx-auto">
                    Our commitment goes beyond beautiful products. We ensure
                    every piece meets the highest standards while supporting
                    sustainable practices and fair trade.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="bg-green-600/20 text-green-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-10 h-10"
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
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      Quality Assured
                    </h3>
                    <p className="text-text-secondary">
                      Every piece undergoes rigorous quality checks
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-blue-600/20 text-blue-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-10 h-10"
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
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      Sustainable
                    </h3>
                    <p className="text-text-secondary">
                      Eco-friendly materials and processes
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-purple-600/20 text-purple-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-10 h-10"
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
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      Fair Trade
                    </h3>
                    <p className="text-text-secondary">
                      Direct partnerships with artisan communities
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-orange-600/20 text-orange-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-10 h-10"
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
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      Authentic
                    </h3>
                    <p className="text-text-secondary">
                      Genuine traditional craftsmanship guaranteed
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default HomePage;
