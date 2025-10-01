import React, { useEffect, useState, useRef } from "react";
import wordmarkEn from "../assets/logo2.png"; // English (base) wordmark (with tagline embedded)
import emblem from "../assets/logo1.png"; // circular emblem

// Placeholder alternative language wordmarks (Hindi, Tamil) can be swapped with real assets later.
// For now we simulate by rendering styled text overlays if image assets are not yet available.
// If you later add images (e.g. logo-hi.png, logo-ta.png) just import and replace entries below.
const languageSequence = [
  { key: "en", label: "Indikaara", asset: wordmarkEn, type: "image" },
  {
    key: "hi",
    label: "इंडिकारा़",
    asset: null,
    type: "text",
  },
  {
    key: "ta",
    label: "இண்டிகார்",
    asset: null,
    type: "text",
  },
];

/**
 * CombinedLogo renders the emblem + wordmark as a single responsive unit.
 * Height is controlled by the parent container; both images scale to fill it.
 * Tagline removed (already baked into provided wordmark asset).
 */
const CombinedLogo = ({ className = "" }) => {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false); // to enforce initial 3s delay
  const intervalRef = useRef(null);

  useEffect(() => {
    // Initial delay before starting rotation
    const delayTimer = setTimeout(() => {
      setReady(true);
    }, 3000);
    return () => clearTimeout(delayTimer);
  }, []);

  useEffect(() => {
    if (!ready) return; // wait until initial delay passes
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % languageSequence.length);
    }, 4500); // 4.5s per language (adjust as desired)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [ready]);

  return (
    <div
      className={`group relative flex items-center gap-3 md:gap-4 lg:gap-5 select-none h-full ${className}`}
      aria-label="Indikaara logo"
    >
      <div className="relative flex-shrink-0 h-full aspect-square flex items-center">
        <img
          src={emblem}
          alt="Indikaara emblem"
          className="h-full w-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:scale-[1.05]"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="relative h-full flex items-center">
        {/* Transition container */}
        <div className="relative h-full flex items-center">
          {languageSequence.map((lang, i) => {
            const isActive = i === index;
            const baseClasses =
              "absolute inset-0 flex items-center" +
              (lang.type === "image" ? "" : " px-1");
            return (
              <div
                key={lang.key}
                className={`${baseClasses} transition-all duration-700 ease-out [backface-visibility:hidden] ${
                  isActive
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-6 scale-95 pointer-events-none"
                }`}
                aria-hidden={!isActive}
              >
                {lang.type === "image" ? (
                  <img
                    src={lang.asset}
                    alt="Indikaara wordmark"
                    className="h-full w-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span
                    className="text-white font-semibold md:font-bold lg:font-extrabold tracking-wide md:tracking-normal lg:tracking-wide whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)] leading-none select-none"
                    style={{
                      fontSize: "clamp(0.9rem, 2.6vw, 2.6rem)",
                      letterSpacing: "0.5px",
                      transform: "translateY(2%)",
                    }}
                  >
                    {lang.label}
                  </span>
                )}
              </div>
            );
          })}
          {/* Reserve width to avoid layout shift: measure English wordmark natural width via hidden clone */}
          <img
            src={wordmarkEn}
            alt=""
            aria-hidden="true"
            className="h-full w-auto opacity-0 invisible select-none pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

export default CombinedLogo;
