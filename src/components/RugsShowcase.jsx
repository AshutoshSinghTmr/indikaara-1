import { useMemo, useState } from "react";
import dataService from "../data/dataService";
import Slider from "react-slick";

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
    slidesToShow: 3,
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
      { breakpoint: 640, settings: { slidesToShow: 1 } },
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
            Explore Collection
          </button>
        </div>
      </div>
    </section>
  );
};
export default RugsShowcase;
