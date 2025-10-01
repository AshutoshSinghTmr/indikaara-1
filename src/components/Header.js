import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import SideNav from "./SideNav";
import logo from "../assets/logo1.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0); // placeholder; integrate with cart context later
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const mobileSearchInputRef = React.useRef(null);

  // Wishlist/cart count fetch (simple localStorage placeholders)
  useEffect(() => {
    try {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlistCount(wishlist.length);
    } catch {}
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length || 0);
    } catch {}
    const handler = () => {
      try {
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setWishlistCount(wishlist.length);
      } catch {}
      try {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartCount(cart.length || 0);
      } catch {}
    };
    window.addEventListener("storage", handler);
    window.addEventListener("wishlistUpdated", handler);
    window.addEventListener("cartUpdated", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("wishlistUpdated", handler);
      window.removeEventListener("cartUpdated", handler);
    };
  }, []);

  // Focus input when mobile search opens & handle ESC close
  useEffect(() => {
    if (mobileSearchOpen && mobileSearchInputRef.current) {
      mobileSearchInputRef.current.focus();
    }
  }, [mobileSearchOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && mobileSearchOpen) {
        setMobileSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileSearchOpen]);

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 h-20 md:h-24 lg:h-28 bg-[#111]/85 backdrop-blur-md border-b border-white/10 shadow-lg transition-[height] duration-300">
      {/* decorative subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 pointer-events-none" />
      {/* Burger extreme left; stable vertical alignment using flex instead of translate */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={isOpen}
          className="pl-3 pr-4 py-3 text-[#E6BB8D] hover:text-[#f3d3a8] focus:outline-none focus:ring-2 focus:ring-[#E6BB8D]/40 rounded-r-md z-50 relative"
        >
          <span
            className="block leading-none text-[2rem] md:text-[2.2rem] lg:text-[2.8rem] w-[2rem] md:w-[2.2rem] lg:w-[2.8rem] h-[1.92rem] md:h-[2.4rem] lg:h-[3.2rem] transition-transform duration-300 ease-out"
            aria-hidden="true"
          >
            <MenuIcon fontSize="inherit" className="w-full h-full" />
          </span>
        </button>
      </div>
      <div className="relative w-full h-full flex items-center justify-center px-4 md:px-8">
        {/* Centered Logo */}
        <div className="flex items-center select-none">
          <Link to="/" className="block">
            <img
              src={logo}
              alt="Indikaara"
              className="h-12 md:h-16 lg:h-20 w-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] transition-all duration-300"
              loading="lazy"
              decoding="async"
            />
          </Link>
        </div>

        {/* Right side actions (full-bleed) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-4 text-white pr-2 md:pr-4">
          {/* Large screens: full search bar + icons */}
          <div className="hidden lg:flex items-center gap-3">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 transition-colors rounded-full pl-3 pr-4 py-2 backdrop-blur-sm border border-white/10"
            >
              <SearchIcon
                className="text-white/70 text-[#E6BB8D]"
                fontSize="medium"
              />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-sm text-white placeholder:text-white/50 w-40 lg:w-56"
              />
            </form>
            {/* Wishlist */}
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative text-white/70 hover:text-white transition-colors"
            >
              <FavoriteBorderIcon className="text-[#E6BB8D]" fontSize="large" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-[10px] min-w-[16px] h-4 px-[4px] rounded-full flex items-center justify-center text-white font-semibold">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>
            {/* Cart */}
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative text-white/70 hover:text-white transition-colors"
            >
              <ShoppingCartIcon className="text-[#E6BB8D]" fontSize="large" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-amber-500 text-[10px] min-w-[16px] h-4 px-[4px] rounded-full flex items-center justify-center text-black font-semibold">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
            {/* Profile */}
            <Link
              to="/login"
              aria-label="Profile / Login"
              className="text-white/70 hover:text-white transition-colors"
            >
              <PersonIcon className="text-[#E6BB8D]" fontSize="large" />
            </Link>
          </div>
          {/* Small & medium: only search icon */}
          <button
            type="button"
            aria-label="Search"
            aria-expanded={mobileSearchOpen}
            aria-controls="mobile-search-bar"
            onClick={() => setMobileSearchOpen((o) => !o)}
            className="lg:hidden p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <SearchIcon fontSize="large" className="text-[#E6BB8D]" />
          </button>
        </div>

        {/* Side Navigation */}
        <SideNav
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          toggleDrawer={(open) => (open ? setIsOpen(true) : setIsOpen(false))}
        />
      </div>
  </header>
  {/* Mobile / tablet inline search bar (below fixed navbar) */}
    {mobileSearchOpen && (
      <div
        id="mobile-search-bar"
        role="search"
        className="lg:hidden fixed left-0 right-0 top-20 md:top-24 z-40 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center gap-3 animate-fade-in"
      >
        <SearchIcon className="text-[#E6BB8D]" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Future: navigate to search results page
            setMobileSearchOpen(false);
          }}
          className="flex-1"
        >
          <input
            ref={mobileSearchInputRef}
            type="text"
            placeholder="Search products, artisans..."
            className="w-full bg-transparent border-none outline-none text-white placeholder:text-white/50 text-base"
          />
        </form>
        <button
          type="button"
            aria-label="Close search"
            onClick={() => setMobileSearchOpen(false)}
            className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <CloseIcon fontSize="medium" />
        </button>
      </div>
    )}
    </>
  );
}
