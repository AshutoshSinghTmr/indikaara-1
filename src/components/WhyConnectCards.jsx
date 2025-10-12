import FoundationCard from "./FoundationCard";
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
  const [active, setActive] = React.useState(null);
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
    <>
      <div className="grid gap-4 sm:gap-5 lg:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-6 sm:mt-10">
        {items.map((i) => (
          <FoundationCard key={i.title} {...i} onClick={() => setActive(i)} />
        ))}
      </div>

      {/* Modal overlay */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="max-w-lg w-full rounded-2xl bg-white text-gray-800 p-5 sm:p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-3">
              <active.icon
                className="text-[#ac1f23]"
                style={{ fontSize: "2rem" }}
              />
              <h3 className="text-xl sm:text-2xl font-semibold">
                {active.title}
              </h3>
            </div>
            <p className="text-sm sm:text-base leading-relaxed">
              {active.description}
            </p>
            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setActive(null)}
                className="px-4 py-2 rounded-md bg-[#ac1f23] text-white hover:bg-[#911a1e]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
