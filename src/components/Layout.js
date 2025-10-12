import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import EnquiryButton from "./EnquiryButton";

/**
 * Layout Component - Main layout wrapper for all pages
 * Features: Header, main content area, footer, and sticky enquiry button
 * @param {React.ReactNode} children - Page content to render
 */
const Layout = ({ children }) => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-background text-primary">
      <div className="flex h-full grow flex-col">
        {/* Header */}
        <Header />
        {/* Main Content; pad top to clear fixed OfferBanner (50px) + Header (80/96/112px) */}
        <main className="pt-[130px] md:pt-[146px] lg:pt-[162px]">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Sticky Enquiry Button */}
      <EnquiryButton />
    </div>
  );
};

export default Layout;
