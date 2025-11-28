import React from "react";
import {
  CheckCircleOutline,
  Public,
  Handshake,
  Palette,
  Recycling,
  SwapHoriz,
} from "@mui/icons-material";

export const WhyConnectCards = () => {
  const [expandedIndex, setExpandedIndex] = React.useState(null);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setExpandedIndex(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const items = [
    {
      icon: CheckCircleOutline,
      title: "Curated Quality",
      description:
        "Each creation in Indikaara’s collection is a labor of love — shaped by hands that carry generations of mastery. Every texture, weave, and stroke is chosen with care, ensuring every piece radiates authenticity and soul. Our promise is timeless quality that feels alive — art that endures long after trends fade.",
    },
    {
      icon: Public,
      title: "Global Reach",
      description:
        "Through Indikaara, the spirit of India journeys across oceans. From the deserts of Rajasthan to the coasts of Kerala, we bring the essence of our homeland to the world. Every handcrafted treasure becomes a silent storyteller — connecting distant hearts through artistry, culture, and the shared beauty of human creativity.",
    },
    {
      icon: Handshake,
      title: "Fair Partnerships",
      description:
        "Behind every creation stands an artisan whose dream we honor. We nurture fair partnerships built on respect, compassion, and shared growth. Every purchase uplifts a family, sustains a village, and breathes new life into traditional craft. Together, we weave a bond where art and humanity flourish hand in hand.",
    },
    {
      icon: Palette,
      title: "Living Heritage",
      description:
        "Our designs are poems of the past — echoing traditions reborn in modern form. At Indikaara, ancient motifs meet contemporary elegance, creating harmony between yesterday’s artistry and today’s vision. Each product celebrates India’s living heritage, carrying whispers of stories, festivals, and dreams once painted in the colors of time.",
    },
    {
      icon: Recycling,
      title: "Sustainable",
      description:
        "We believe beauty should never come at the earth’s expense. Our artisans craft with intention — using natural fibers, ethical materials, and mindful methods. Every stitch and carving reflects balance with nature. Sustainability for us is not a choice but a philosophy — a gentle rhythm guiding how we create and care.",
    },
    {
      icon: SwapHoriz, // or Loop, Cached
      title: "Easy Returns & Exchanges",
      description:
        "Your connection with Indikaara should feel effortless. If your chosen piece doesn’t feel right, our return and exchange process is graceful and seamless. We value your trust, ensuring every interaction reflects warmth and understanding — because true craftsmanship is not only in our art, but in the care we extend to you.",
    },
  ];

  return (
    <div className="grid gap-[clamp(1rem,3vw,2rem)] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full mt-[clamp(1.5rem,3vw,2.5rem)]">
      {items.map((item, index) => {
        const Icon = item.icon;
        // Mobile: one card at a time (expandedIndex matches current index)
        // Desktop: all expand together (expandedIndex is not null)
        const isExpanded = isMobile
          ? expandedIndex === index
          : expandedIndex !== null;

        const handleClick = () => {
          if (isMobile) {
            // Mobile: toggle individual card
            setExpandedIndex(expandedIndex === index ? null : index);
          } else {
            // Desktop: expand all or collapse all
            setExpandedIndex(expandedIndex === null ? index : null);
          }
        };

        return (
          <div
            key={item.title}
            className="rounded-[clamp(0.75rem,3vw,1.5rem)] bg-gray-100/90 shadow-sm transition-all duration-300 overflow-hidden"
          >
            {/* Summary Section */}
            <button
              onClick={handleClick}
              className={`w-full p-[clamp(1rem,3vw,1.5rem)] flex items-start gap-[clamp(0.75rem,2.5vw,1rem)] transition-colors text-left cursor-pointer hover:bg-gray-100`}
            >
              <div className="flex-shrink-0">
                <Icon
                  className="text-[#ac1f23] drop-shadow-sm"
                  style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)" }}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-[clamp(1rem,2.5vw,1.25rem)] font-semibold tracking-wide text-gray-800">
                  {item.title}
                </h3>
              </div>
              <svg
                className={`w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)] flex-shrink-0 transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                } mt-0.5`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>

            {/* Expandable Details */}
            {isExpanded && (
              <div className="px-[clamp(1rem,3vw,1.5rem)] pb-[clamp(1rem,3vw,1.5rem)] border-t border-gray-300 pt-[clamp(0.75rem,2vw,1rem)] bg-white animate-in fade-in duration-200">
                <p className="text-[clamp(0.875rem,2.5vw,1rem)] leading-relaxed text-gray-900 font-medium">
                  {item.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
