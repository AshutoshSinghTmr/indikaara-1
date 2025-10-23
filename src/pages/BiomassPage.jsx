import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  CardMedia,
  CardHeader,
} from "@mui/material";
import BiomassHero from "../assets/biomass/biomass-hero.png";
import GroundnutShell from "../assets/biomass/groundnut-shell.jpg";
import SawDust from "../assets/biomass/sawdust-dust.webp";
import CashewShell from "../assets/biomass/cashew-shell.webp";
import SugarcaneBagasse from "../assets/biomass/Sugarcane-bagasse.png";
import SoyaHusk from "../assets/biomass/soya-husk.webp";
import RiceHusk from "../assets/biomass/RiceHusk.jpeg";
import CottonWaste from "../assets/biomass/cotton-waste.jpeg";
import CornWaste from "../assets/biomass/corn-waste.jpeg";
import MustardHusk from "../assets/biomass/mustard-husk.jpeg";
const BiomassPage = () => {
  return (
    <Box className="min-h-screen bg-background text-primary font-sans">
      {/* Hero Section */}
      <Box className="flex flex-col items-center justify-center text-center px-6 py-24 lg:py-32 bg-gradient-to-b from-[#1c1c1c] to-[#0e0e0e]">
        <Typography
          variant="h2"
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-secondary mb-4"
        >
          Biomass: Pellets & Briquettes
        </Typography>
        <Typography
          variant="h6"
          className="text-gray-300 max-w-2xl leading-relaxed"
          sx={{ margin: "10px" }}
        >
          Transforming agricultural and forestry residues into sustainable
          energy. Indikaara drives the shift toward a cleaner, greener future
          through high-quality biomass fuels.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ marginTop: "15px", backgroundColor: "#ac1f23" }}
          onClick={() => (window.location.href = "/contact")}
          className="bg-primary hover:bg-[#911a1d] text-secondary px-8 rounded-2xl shadow-lg normal-case"
        >
          Get in Touch
        </Button>
      </Box>

      {/* Intro Section */}
      <Box className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6 py-20">
        <div className="space-y-6">
          <Typography
            variant="h3"
            className="text-2xl font-bold text-[#ac1f23] tracking-wide"
          >
            Sustainable Energy Revolution
          </Typography>
          <Typography variant="h6" className="text-gray-300 leading-relaxed">
            India’s industrial landscape is undergoing a major transformation
            with biomass fuels like briquettes and pellets. They reduce carbon
            emissions, utilize agro-waste, and support local economies — all
            while maintaining strong thermal efficiency.
          </Typography>
          <Typography variant="h6" className="text-gray-300 leading-relaxed">
            Each pellet and briquette we produce aligns with our vision of
            responsible energy — cleaner combustion, less waste, and a greener
            tomorrow.
          </Typography>
        </div>
        <div>
          <img
            src={BiomassHero}
            alt="Biomass Pellets"
            className="w-full rounded-[80px] shadow-2xl border border-gray-700 object-cover"
          />
        </div>
      </Box>

      {/* Raw Materials Section */}
      <Box className="py-16 bg-[#121212] border-t border-[#2a2a2a]">
        <Typography
          variant="h4"
          className="text-center text-[#ac1f23] font-bold"
        >
          Biomass Raw Materials & Calorific Values
        </Typography>
        <Box className="max-w-6xl mx-auto px-6 pt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              material: "Groundnut Shell",
              gcv: "3,800–4,000 kcal/kg",
              image: GroundnutShell,
            },
            {
              material: "Wood Dust (Sawdust)",
              gcv: "4,000–4,500 kcal/kg",
              image: SawDust,
            },
            {
              material: "Cashew Shell Waste",
              gcv: "4,200–4,800 kcal/kg",
              image: CashewShell,
            },
            {
              material: "Sugarcane Bagasse",
              gcv: "3,600–3,800 kcal/kg",
              image: SugarcaneBagasse,
            },
            {
              material: "Soybean Husk",
              gcv: "3,600–3,800 kcal/kg",
              image: SoyaHusk,
            },
            {
              material: "Rice Husk",
              gcv: "3,400–3,600 kcal/kg",
              image: RiceHusk,
            },
            {
              material: "Cotton Waste",
              gcv: "3,600–3,800 kcal/kg",
              image: CottonWaste,
            },
            {
              material: "Corn Cob",
              gcv: "3,600–3,800 kcal/kg",
              image: CornWaste,
            },
            {
              material: "Mustard Husk",
              gcv: "3,600–3,800 kcal/kg",
              image: MustardHusk,
            },
          ].map((item, i) => (
            <Card
              key={i}
              className="bg-[#1a1a1a] border border-[#ac1f23] rounded-4xl hover:border-[#ac1f23] hover:shadow-lg transition-transform transform hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <CardHeader title={item.material} />
                <CardMedia
                  component="img"
                  alt={item.material}
                  image={item.image}
                />
                <Typography
                  variant="h6"
                  className="text-secondary font-semibold mb-2"
                >
                  {item.material}
                </Typography>
                <Typography className="text-[oklch(12.9% 0.042 264.695)]">
                  <strong>GCV:</strong> {item.gcv}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Key Advantages */}
      <Box className="py-16 max-w-6xl mx-auto px-6">
        <Typography
          variant="h4"
          className="text-center text-[#ac1f23] font-bold mb-10"
        >
          Why Choose Indikaara Biomass?
        </Typography>
        <Box className="grid md:grid-cols-3 gap-10 pt-10">
          {[
            {
              title: "Eco-Friendly Energy",
              desc: "Every briquette and pellet replaces fossil fuels, cutting greenhouse emissions and helping India’s sustainability goals.",
            },
            {
              title: "High Calorific Value",
              desc: "Our optimized process ensures consistent density, clean burning, and maximum energy output for industrial users.",
            },
            {
              title: "Rural Empowerment",
              desc: "We source locally and create jobs in agricultural regions, strengthening India’s green economy at the grassroots level.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#1a1a1a] rounded-2xl p-8 text-center border border-gray-700 hover:border-primary transition-all"
            >
              <Typography
                variant="h5"
                sx={{ marginBottom: "10px" }}
                className="text-[#ac1f23] text-bold font-semibold"
              >
                {item.title}
              </Typography>
              <Typography className="text-gray-300">{item.desc}</Typography>
            </div>
          ))}
        </Box>
      </Box>

      {/* CTA Section */}
      <Box className="py-20 text-center bg-gradient-to-t from-[#111] to-[#191919] border-t border-[#2a2a2a]">
        <Typography
          variant="h4"
          className="text-2xl md:text-3xl font-bold text-secondary p-4"
        >
          Ready to transition to clean, renewable fuel?
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ marginTop: "15px", backgroundColor: "#ac1f23" }}
          className="hover:bg-[#911a1d] text-white px-8 rounded-2xl shadow-lg normal-case"
          onClick={() => (window.location.href = "/contact")}
        >
          Connect with Us
        </Button>
      </Box>
    </Box>
  );
};

export default BiomassPage;
