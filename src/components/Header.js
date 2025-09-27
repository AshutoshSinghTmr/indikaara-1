import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import logo from "../assets/logo4.png";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import RssFeedIcon from "@mui/icons-material/RssFeed"; //ab
/**
 * Header Component - Main navigation header for the application
 * Features: Logo, navigation menu, search bar, user actions, and profile
 * Responsive: Includes burger menu for mobile devices
 */
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount } = useCart();

  // Track wishlist count
  useEffect(() => {
    const updateWishlistCount = () => {
      try {
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setWishlistCount(wishlist.length);
      } catch (error) {
        setWishlistCount(0);
      }
    };

    // Initial load
    updateWishlistCount();

    // Listen for localStorage changes (from other tabs)
    window.addEventListener("storage", updateWishlistCount);

    // Listen for custom wishlist update events
    window.addEventListener("wishlistUpdated", updateWishlistCount);

    return () => {
      window.removeEventListener("storage", updateWishlistCount);
      window.removeEventListener("wishlistUpdated", updateWishlistCount);
    };
  }, []);

  // Track scroll position for sticky header transparency
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Apply/remove body class to neutralize header backdrop when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    return () => document.body.classList.remove("menu-open");
  }, [isMobileMenuOpen]);

  // Prevent side-nav from becoming transparent on scroll, and optionally close it
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    // Force the menu to stay opaque on scroll
    const handleScroll = () => {
      // Force opacity refresh by accessing the DOM element
      const sideNav = document.querySelector(
        '.fixed[style*="z-index: 9999995"]'
      );
      if (sideNav) {
        sideNav.style.backgroundColor = "#1a1a1a";
        sideNav.style.opacity = "1";
      }

      // Uncommenting the line below would close the menu on scroll
      // setIsMobileMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // also listen for touchmove for some mobile browser behaviours
    window.addEventListener("touchmove", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-26 ${
        isMobileMenuOpen ? "z-40" : "z-50"
      } transition-all duration-300 ${
        isScrolled
          ? "bg-[#1a1a1a]/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-[#1a1a1a]/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
      }`}
    >
      {/* Glass effect overlay when scrolled */}
      {isScrolled && (
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5 pointer-events-none"></div>
      )}
      <div className="flex items-center justify-between px-4 md:px-10 py-4 max-w-7xl mx-auto relative">
        {/* Mobile Left Section - Burger Menu Only */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Hamburger Menu Button */}
          <button
            className="flex items-center justify-center p-2 text-secondary hover:text-primary transition-colors focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <MenuIcon style={{ fontSize: "1.5rem" }} />
          </button>
        </div>

        {/* Logo and Navigation Section */}
        <div className="flex items-center gap-8">
          {/* Logo - Centered on mobile, left-aligned on desktop */}
          <div className="flex items-center gap-4 text-primary md:static absolute left-1/2 md:left transform -translate-x-1/2 md:transform-none">
            <Link
              to="/"
              className="text-primary text-xl font-bold leading-tight tracking-[-0.015em] hover:text-[var(--accent-color)] transition-colors focus:outline-none"
              onClick={closeMobileMenu}
            >
              {/* Mobile Logo - logo2.png with adjusted size to fit between icons */}
              <img
                src={logo}
                alt="Indikaara Logo"
                className="h-12 w-auto md:hidden"
              />
              {/* Desktop Logo - logo1.png */}
              <img
                src={logo}
                alt="Indikaara Logo"
                className="hidden md:block h-10 lg:h-14 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation Menu */}
          <nav
            className="hidden lg:flex items-center gap-14 mx-12"
            role="navigation"
            aria-label="Main navigation"
          >
            <Link
              to="/"
              className="text-secondary hover:text-primary text-sm font-medium leading-normal transition-colors focus:outline-none"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              to="/catalogue"
              className="text-secondary hover:text-primary text-sm font-medium leading-normal transition-colors focus:outline-none"
            >
              Catalogue
            </Link>
            <Link
              to="/artisans"
              className="text-secondary hover:text-primary text-sm font-medium leading-normal transition-colors focus:outline-none"
            >
              Artisans
            </Link>
            <Link
              to="/foundation"
              className="text-secondary hover:text-primary text-sm font-medium leading-normal transition-colors focus:outline-none"
            >
              Foundation
            </Link>
            <Link
              to="/blog"
              className="text-secondary hover:text-primary text-sm font-medium leading-normal transition-colors focus:outline-none"
            >
              Blog
            </Link>
          </nav>
        </div>

        {/* Desktop Search and Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Search Bar */}
          <div className="flex items-center gap-2 bg-surface-secondary rounded-[var(--border-radius-full)] px-4 py-2 min-w-[300px]">
            <SearchIcon className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for handcrafted treasures..."
              className="bg-transparent border-none outline-none text-white placeholder:text-gray-400 text-sm w-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="flex items-center gap-2 text-secondary hover:text-primary transition-colors relative focus:outline-none"
              aria-label={`Wishlist with ${wishlistCount} items`}
            >
              <div className="relative">
                <FavoriteBorderIcon style={{ fontSize: "1.5rem" }} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="flex items-center gap-2 text-secondary hover:text-primary transition-colors relative focus:outline-none"
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <div className="relative">
                <ShoppingCartIcon style={{ fontSize: "1.5rem" }} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-background text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </div>
            </Link>

            <Link
              to="/login"
              className="flex items-center gap-2 text-secondary hover:text-primary transition-colors focus:outline-none"
              aria-label="User profile"
            >
              <PersonIcon style={{ fontSize: "1.5rem" }} />
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          {/* Mobile Cart and User Icons */}
          <Link
            to="/cart"
            className="relative focus:outline-none"
            aria-label={`Shopping cart with ${itemCount} items`}
          >
            <svg
              width="1.5rem"
              height="1.5rem"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />{" "}
              </g>
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-background text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </Link>

          {/* Mobile User/Login Icon */}
          <button
            className="flex items-center justify-center p-2 text-secondary hover:text-primary transition-colors focus:outline-none"
            aria-label="User profile"
          ></button>
        </div>
      </div>

      {/* Mobile Side Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 md:hidden" style={{ zIndex: 9999999 }}>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/90"
            onClick={closeMobileMenu}
            style={{ zIndex: 9999990 }}
          ></div>

          {/* Side Navigation Panel */}
          <div
            className={`fixed top-0 left-0 h-full w-70 bg-[#1a1a1a] shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-gray-700 ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            style={{ zIndex: 9999995, backgroundColor: "#1a1a1a", opacity: 1 }}
          >
            {/* Solid background overlay to prevent transparency */}
            <div className="fixed inset-0 right-[224px] w-70 bg-[#1a1a1a]"></div>
            <div
              className="flex flex-col h-full bg-[#1a1a1a] relative z-30"
              style={{ backgroundColor: "#1a1a1a", opacity: 1 }}
            >
              {/* Header with Search */}
              <div
                className="p-4 border-b border-gray-800"
                style={{ backgroundColor: "#1a1a1a" }}
              >
                {/* Search Section at Top */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-3">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="bg-transparent border-none outline-none text-white placeholder:text-gray-500 text-sm w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <nav
                className="flex-1 px-4 py-4 bg-[#1a1a1a]"
                role="navigation"
                aria-label="Mobile navigation"
                style={{ backgroundColor: "#1a1a1a", opacity: 1 }}
              >
                <div className="space-y-2">
                  <Link
                    to="/"
                    className="flex items-center px-3 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 text-sm font-medium focus:outline-none"
                    onClick={closeMobileMenu}
                  >
                    <HomeIcon className="w-5 h-5 mr-3 text-teal-500" />
                    Home
                  </Link>
                  <div className="border-b border-gray-700 mx-3"></div>
                  <Link
                    to="/catalogue"
                    className="flex items-center px-3 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 text-sm font-medium focus:outline-none"
                    onClick={closeMobileMenu}
                  >
                    <InventoryIcon className="w-5 h-5 mr-3 text-teal-500" />
                    Catalogue
                  </Link>
                  <div className="border-b border-gray-700 mx-3"></div>
                  <Link
                    to="/artisans"
                    className="flex items-center px-3 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 text-sm font-medium focus:outline-none"
                    onClick={closeMobileMenu}
                  >
                    <Diversity1Icon className="w-5 h-5 mr-3 text-teal-500" />
                    Artisans
                  </Link>
                  <div className="border-b border-gray-700 mx-3"></div>
                  {/*ab*/}
                  <Link
                    to="/foundation"
                    className="flex items-center px-3 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 text-sm font-medium focus:outline-none"
                    onClick={closeMobileMenu}
                  >
                    <CorporateFareIcon className="w-5 h-5 mr-3 text-teal-500" />
                    Foundation
                  </Link>
                  <div className="border-b border-gray-700 mx-3"></div>
                  <Link
                    to="/blog"
                    className="flex items-center px-3 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 text-sm font-medium focus:outline-none"
                    onClick={closeMobileMenu}
                  >
                    <RssFeedIcon className="w-5 h-5 mr-3 text-teal-500" />
                    Blog
                  </Link>
                  <div className="border-b border-gray-700 mx-3"></div>
                </div>

                {/* Account Section */}
                <div className="space-y-2">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Account
                  </div>

                  <Link
                    to="/wishlist"
                    className="flex items-center justify-between px-3 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 text-sm font-medium focus:outline-none"
                    onClick={closeMobileMenu}
                  >
                    <div className="flex items-center">
                      <FavoriteBorderIcon className="w-5 h-5 mr-3 text-teal-500" />
                      Wishlist
                    </div>
                    {wishlistCount > 0 && (
                      <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {wishlistCount > 99 ? "99+" : wishlistCount}
                      </span>
                    )}
                  </Link>
                  {/* <div className="border-b border-gray-700 mx-3"></div> */}

                  <Link
                    to="/cart"
                    className="flex items-center justify-between px-3 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 text-sm font-medium focus:outline-none"
                    onClick={closeMobileMenu}
                  >
                    <div className="flex items-center">
                      <ShoppingCartIcon className="w-5 h-5 mr-3 text-teal-500" />
                      Cart
                    </div>
                    {itemCount > 0 && (
                      <span className="bg-teal-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {itemCount > 99 ? "99+" : itemCount}
                      </span>
                    )}
                  </Link>
                  {/* <div className="border-b border-gray-700 mx-3"></div> */}

                  <Link
                    to="/login"
                    className="flex items-center w-full px-3 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 text-sm font-medium focus:outline-none"
                  >
                    <PersonIcon className="w-5 h-5 mr-2 text-teal-500" />
                    Profile
                  </Link>
                  {/* <div className="border-b border-gray-700 mx-3"></div> */}
                </div>
              </nav>
              {/* Made in India with Love - Footer */}
              <div
                className="px-4 py-4 border-t border-gray-800 bg-[#1a1a1a] relative z-40"
                style={{ backgroundColor: "#1a1a1a", opacity: 1 }}
              >
                <div
                  className="absolute inset-0 bg-[#1a1a1a]"
                  style={{ opacity: 1 }}
                ></div>
                <div
                  className="flex items-center justify-center space-x-2 text-xs text-gray-400 relative z-50"
                  style={{ backgroundColor: "#1a1a1a" }}
                >
                  <span>Made in India with</span>
                  <svg
                    className="w-3 h-3 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
