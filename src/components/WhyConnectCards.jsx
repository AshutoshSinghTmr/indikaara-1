import FoundationCard from "./FoundationCard";
import {
  CheckCircleOutline,
  Public,
  Handshake,
  Palette,
  Recycling,
} from "@mui/icons-material";

export const WhyConnectCards = () => {
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
        <FoundationCard key={i.title} {...i} />
      ))}
    </div>
  );
};
