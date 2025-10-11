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
      description: "Every piece is artisan-made & authenticity verified.",
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
    {
      icon: SwapHoriz, // or Loop, Cached
      title: "Easy Returns & Exchanges",
      description:
        "A straightforward and speedy process for any returns or exchanges.",
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
