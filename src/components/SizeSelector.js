import React, { useState, useEffect } from "react";
// Added hidePrices prop (boolean) to optionally suppress price display (e.g., for Rugs)
// Buttons restyled to be square and uniform
const SizeSelector = ({
  priceOptions = [],
  onSizeSelect,
  selectedSize,
  hidePrices = false,
}) => {
  const [internalSelectedSize, setInternalSelectedSize] = useState(
    selectedSize || ""
  );

  useEffect(() => {
    setInternalSelectedSize(selectedSize || "");
  }, [selectedSize]);

  const formatPrice = (amount) => {
    return `₹${amount.toLocaleString()}`;
  };

  const handleSizeSelect = (size, amount) => {
    setInternalSelectedSize(size);
    if (onSizeSelect) {
      onSizeSelect(size, amount);
    }
  };

  if (!priceOptions || priceOptions.length === 0) {
    return (
      <div className="text-secondary">
        <p>No size options available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-full sm:max-w-md md:max-w-lg mx-auto">
      <h3 className="text-lg font-semibold text-primary mb-2 text-center">
        Select Size
      </h3>

      <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 sm:gap-3">
        {priceOptions.map((option, index) => {
          const isSelected = internalSelectedSize === option.size;

          return (
            <button
              key={option.size + "-" + index}
              onClick={() => handleSizeSelect(option.size, option.amount)}
              className={`aspect-square flex flex-col items-center justify-center border-2 rounded-md text-center px-1.5 py-1.5 sm:px-2 sm:py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/60 focus:ring-offset-2 focus:ring-offset-transparent ${
                isSelected
                  ? "border-accent bg-accent/10 text-primary shadow-md"
                  : "border-gray-300 hover:border-accent/50 text-secondary hover:text-primary"
              }`}
            >
              <span className="font-medium text-[11px] sm:text-sm md:text-base leading-tight">
                {option.size}
              </span>
              {!hidePrices && (
                <span className="mt-0.5 font-bold text-[10px] sm:text-xs md:text-sm text-accent">
                  {formatPrice(option.amount)}
                </span>
              )}
              {isSelected && (
                <span className="mt-0.5 text-[9px] sm:text-[10px] md:text-xs text-accent">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      {internalSelectedSize && (
        <div className="mt-2 p-2 bg-accent/5 border border-accent/30 rounded-md text-center max-w-sm mx-auto">
          <p className="text-[11px] sm:text-xs md:text-sm text-secondary">
            Selected Size:{" "}
            <span className="font-medium text-primary">
              {internalSelectedSize}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SizeSelector;
