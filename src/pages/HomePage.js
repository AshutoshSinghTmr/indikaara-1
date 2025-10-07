import React, { useMemo, useState } from "react";
import HeroSection from "../components/HeroSection";
import ArtisanStorySection from "../components/ArtisanStorySection";
import FeaturedArtisan from "../components/FeaturedArtisan";
import dataService from "../data/dataService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  CheckCircleOutline,
  Public,
  Handshake,
  Palette,
  Recycling,
} from "@mui/icons-material";

// Simple info card used in WhyConnect section
const Card = ({ icon: Icon, title, description, highlight }) => {
  return (
    <div
      className={
        `h-full group relative p-6 rounded-2xl flex flex-col shadow-sm transition-all duration-400 ease-out ` +
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
    </div>
  );
};

// Grid of why-connect cards
const WhyConnectCards = () => {
  const items = [
    {
      icon: CheckCircleOutline,
      title: "Curated Quality",
      description: "Every piece is artisan-made & authenticity verified.",
      highlight: true,
    },
    {
      icon: Public,
      title: "Global Reach",
      description: "Helping Indian craftsmanship reach the world.",
    },
    {
      icon: Handshake,
      title: "Fair Partnerships",
      description: "Ethical sourcing & direct artisan collaboration.",
    },
    {
      icon: Palette,
      title: "Living Heritage",
      description: "Designs rooted in culture, adapted for modern living.",
    },
    {
      icon: Recycling,
      title: "Sustainable",
      description: "Eco-conscious materials & mindful production.",
    },
  ];
  return (
    <div className="grid gap-5 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-6 sm:mt-10">
      {items.map((i) => (
        <Card key={i.title} {...i} />
      ))}
    </div>
  );
};

// Center-stacked Rugs carousel (image + name + CTA) with no price/description
const RugsShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Unified rug selection logic
  const rugs = useMemo(() => {
    const all = dataService.getAllProducts();
    const primary = all.filter(
      (p) => p.category && p.category.toLowerCase() === "rugs"
    );
    const categoryContains = all.filter(
      (p) => p.category && /rug/i.test(p.category)
    );
    const nameContains = all.filter((p) =>
      /rug|knotted|tibetan|weave|carpet/i.test(p.name)
    );
    const merged = [...primary, ...categoryContains, ...nameContains];
    const unique = Array.from(new Map(merged.map((m) => [m.id, m])).values());
    if (unique.length) return unique.slice(0, 6);
    return all.slice(0, 6); // absolute fallback
  }, []);

  const hasTrueRugs = rugs.some((r) => r.category && /rug/i.test(r.category));

  const ArrowBtn = ({ onClick, dir }) => (
    <button
      aria-label={dir === "prev" ? "Previous rug" : "Next rug"}
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/30 text-white/80 hover:text-white hover:border-white/60 bg-black/30 backdrop-blur-sm flex items-center justify-center transition-colors ${
        dir === "prev" ? "-left-4 sm:-left-8" : "-right-4 sm:-right-8"
      }`}
      type="button"
    >
      {dir === "prev" ? "←" : "→"}
    </button>
  );

  const settings = {
    className: "rugs-center-slider",
    centerMode: true,
    centerPadding: "0px",
    dots: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 4500,
    pauseOnHover: true,
    slidesToShow: 5,
    swipeToSlide: true,
    arrows: true,
    prevArrow: <ArrowBtn dir="prev" />,
    nextArrow: <ArrowBtn dir="next" />,
    beforeChange: (_, next) => setActiveIndex(next),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 5 } },
      { breakpoint: 900, settings: { slidesToShow: 5 } },
      { breakpoint: 820, settings: { slidesToShow: 5 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 3 } },
      { breakpoint: 520, settings: { slidesToShow: 1 } },
      { breakpoint: 460, settings: { slidesToShow: 1 } },
      { breakpoint: 400, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section
      aria-labelledby="rugs-showcase-title"
      className="relative bg-gradient-to-b from-gray-900 via-[#101010] to-gray-950 py-16 sm:py-20 px-4 sm:px-8 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.08), transparent 55%)",
        }}
      />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <h2
            id="rugs-showcase-title"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
          >
            Explore Our Exclusive Rug Collection
          </h2>
          {!hasTrueRugs && (
            <p className="mt-2 text-sm text-gray-400 max-w-md mx-auto">
              Showing featured textiles while dedicated rug inventory loads.
            </p>
          )}
        </div>
        <div className="relative">
          <Slider {...settings}>
            {rugs.map((item, idx) => (
              <div key={item.id || idx} className="px-2 select-none">
                <div className="relative flex items-end justify-center h-[340px] sm:h-[400px]">
                  <img
                    src={item.images && item.images[0]}
                    alt={item.name}
                    loading="lazy"
                    className="rug-stack-image transition-all duration-500 ease-out object-cover rounded shadow-lg"
                    style={{ height: "88%", width: "auto" }}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm sm:text-base font-medium text-gray-200">
            {rugs[activeIndex % rugs.length]?.name}
          </p>
          <button
            onClick={() => (window.location.href = "/catalogue?category=rugs")}
            className="mt-4 inline-block text-[11px] tracking-wide font-semibold uppercase text-gray-200 border-b-2 border-gray-400/60 hover:border-white transition-colors"
          >
            Shop Collection
          </button>
        </div>
      </div>
    </section>
  );
};

// Center-stacked Handicraft Items carousel
const HandicraftShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = useMemo(() => {
    const all = dataService.getAllProducts();
    // unified name in normalization: "Handicraft Items" plus legacy categories merged into it
    const primary = all.filter(
      (p) => p.category && p.category.toLowerCase() === "handicraft items"
    );
    // Add any product whose category or tags hint at decor / wall / vintage
    const extended = all.filter(
      (p) =>
        /decor|wall|vintage|craft|handicraft/i.test(p.category || "") ||
        (p.tags || []).some((t) =>
          /decor|wall|vintage|craft|handicraft/i.test(t)
        )
    );
    const merged = [...primary, ...extended];
    const unique = Array.from(new Map(merged.map((m) => [m.id, m])).values());
    if (unique.length) return unique.slice(0, 6);
    return all.slice(0, 6); // fallback
  }, []);

  if (!items.length) return null;

  const ArrowBtn = ({ onClick, dir }) => (
    <button
      aria-label={dir === "prev" ? "Previous handicraft" : "Next handicraft"}
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/30 text-white/80 hover:text-white hover:border-white/60 bg-black/30 backdrop-blur-sm flex items-center justify-center transition-colors ${
        dir === "prev" ? "-left-4 sm:-left-8" : "-right-4 sm:-right-8"
      }`}
      type="button"
    >
      {dir === "prev" ? "←" : "→"}
    </button>
  );

  const settings = {
    className: "rugs-center-slider",
    centerMode: true,
    centerPadding: "0px",
    dots: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 4800,
    pauseOnHover: true,
    slidesToShow: 5,
    swipeToSlide: true,
    arrows: true,
    prevArrow: <ArrowBtn dir="prev" />,
    nextArrow: <ArrowBtn dir="next" />,
    beforeChange: (_, next) => setActiveIndex(next),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 5 } },
      { breakpoint: 900, settings: { slidesToShow: 5 } },
      { breakpoint: 820, settings: { slidesToShow: 5 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 3 } },
      { breakpoint: 520, settings: { slidesToShow: 1 } },
      { breakpoint: 460, settings: { slidesToShow: 1 } },
      { breakpoint: 400, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section
      aria-labelledby="handicraft-showcase-title"
      className="relative bg-gradient-to-b from-[#101010] via-[#0d0d0d] to-gray-900 py-16 sm:py-20 px-4 sm:px-8 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.05), transparent 60%)",
        }}
      />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <h2
            id="handicraft-showcase-title"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
          >
            Discover Handicraft Highlights
          </h2>
          <p className="mt-2 text-sm text-gray-400 max-w-md mx-auto">
            A curated glimpse of handcrafted decor & wall art.
          </p>
        </div>
        <div className="relative">
          <Slider {...settings}>
            {items.map((item, idx) => (
              <div key={item.id || idx} className="px-2 select-none">
                <div className="relative flex items-end justify-center h-[320px] sm:h-[380px]">
                  <img
                    src={item.images && item.images[0]}
                    alt={item.name}
                    loading="lazy"
                    className="rug-stack-image transition-all duration-500 ease-out object-cover rounded shadow-lg"
                    style={{
                      height:
                        idx === activeIndex % items.length ? "90%" : "80%",
                      width: "auto",
                      filter:
                        idx === activeIndex % items.length
                          ? "none"
                          : "grayscale(15%) brightness(0.9)",
                      opacity: idx === activeIndex % items.length ? 1 : 0.85,
                    }}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm sm:text-base font-medium text-gray-200">
            {items[activeIndex % items.length]?.name}
          </p>
          <button
            onClick={() =>
              (window.location.href = "/catalogue?category=Handicraft%20Items")
            }
            className="mt-4 inline-block text-[11px] tracking-wide font-semibold uppercase text-gray-200 border-b-2 border-gray-400/60 hover:border-white transition-colors"
          >
            Browse Collection
          </button>
        </div>
      </div>
    </section>
  );
};

// Main Home Page
const HomePage = () => {
  return (
    <main role="main">
      {/*HERO section */}
      <HeroSection />

      {/*WHY CONNECT WITH INDIKAARA section */}
      <section>
        <div className="min-h-[580px] sm:min-h-[620px] lg:min-h-screen bg-gray-50 flex items-start sm:items-center justify-center p-3 sm:p-6 lg:p-8 font-sans">
          <div className="w-full bg-white p-4 sm:p-7 lg:p-12 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl text-center max-w-6xl mx-auto">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-gray-800 mb-3 leading-tight">
              Why Connect with{" "}
              <span className="text-orange-600">Indikaara?</span>
            </h1>
            <p className="text-sm xs:text-base sm:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8">
              We bridge the world and India's finest artisans—built on
              authenticity, empowerment, and timeless craft.
            </p>
            <WhyConnectCards />
            <div className="bg-orange-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl mt-8 sm:mt-10">
              <p className="italic text-gray-700 leading-relaxed text-xs sm:text-sm">
                "Indikaara didn't just sell my art; they shared my story. It's a
                partnership that honors my craft and heritage."
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

      {/*RUGS SHOWCASE section */}
      <RugsShowcase />

      {/*HANDICRAFT ITEMS SHOWCASE section */}
      <HandicraftShowcase />

      {/*FOUNDATION + ARTISAN STORY + FEATURED ARTISAN + QUALITY & SUSTAINABILITY + CERTIFICATIONS section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        {/*ARTISAN STORY section */}
        <section
          className="artisan-story-section w-full"
          style={{ marginTop: "4rem" }}
        >
          <ArtisanStorySection />
        </section>

        {/*FEATURED ARTISAN section */}
        <section className="w-full">
          <FeaturedArtisan />
        </section>

        {/*QUALITY & SUSTAINABILITY section */}
        <section className="my-10 w-full">
          <div className="bg-[#111827] rounded-none sm:rounded-xl p-6 sm:p-8 md:p-12 w-full">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4">
                Quality & Sustainability
              </h2>
              <p className="text-text-secondary text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
                Our commitment goes beyond beautiful products—every piece meets
                the highest standards while supporting sustainable practices &
                fair trade.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  title: "Quality Assured",
                  svg: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  ),
                  color: "green",
                  text: "Every piece undergoes rigorous checks",
                },
                {
                  title: "Sustainable",
                  svg: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                    />
                  ),
                  color: "blue",
                  text: "Eco-friendly materials & processes",
                },
                {
                  title: "Fair Trade",
                  svg: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  ),
                  color: "purple",
                  text: "Direct artisan partnerships",
                },
                {
                  title: "Authentic",
                  svg: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  ),
                  color: "orange",
                  text: "Genuine craftsmanship guaranteed",
                },
              ].map((item) => (
                <div key={item.title} className="text-center px-1">
                  <div
                    className={`bg-${item.color}-600/20 text-${item.color}-400 w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}
                  >
                    <svg
                      className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {item.svg}
                    </svg>
                  </div>
                  <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-primary mb-1 sm:mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-xs sm:text-sm md:text-base">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/*CERTIFICATIONS section */}
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
                Recognitions and compliance frameworks reflecting quality,
                transparency & ethical trade.
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
              ].map((c) => (
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
