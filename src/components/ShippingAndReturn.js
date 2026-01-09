import React from "react";
import "./ShippingAndReturn.css";

const points = [
  {
    label: "Sabr",
    color: "#38bdf8",
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12l2 2 4-4" />
      </svg>
    ),
    text: "Your order is usually dispatched within 24 hours of placing the order.",
  },
  {
    label: "Raftaar",
    color: "#f59e42",
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="#f59e42"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 12h20M12 2l4 4-4 4M12 22l-4-4 4-4" />
      </svg>
    ),
    text: "We offer express delivery, typically arriving in 2-5 days. Please keep your phone reachable.",
  },
  {
    label: "Sukoon",
    color: "#10b981",
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 15s1.5 2 4 2 4-2 4-2" />
      </svg>
    ),
    text: "Easy returns and replacements within 5 days.",
  },
  {
    label: "Dastoor",
    color: "#ef4444",
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="#ef4444"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="11" width="18" height="7" rx="2" />
        <path d="M16 11V7a4 4 0 00-8 0v4" />
      </svg>
    ),
    text: "COD and shipping charges may apply to certain items.",
  },
];

const ShippingAndReturn = () => (
  <section className="shipping-return-section-modern dark-theme w-full py-12 px-4 sm:px-8 lg:px-12 mb-12">
    <div className="max-w-3xl mx-auto">
      <h2 className="shipping-return-title text-3xl md:text-4xl font-extrabold mb-8 text-center">
        Shipping & Return
      </h2>
      <ul className="shipping-return-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {points.map((point) => (
          <li
            key={point.label}
            className="shipping-return-item flex flex-col items-center text-center gap-3 p-6 rounded-xl bg-white/80 shadow-sm hover:shadow-lg transition-shadow h-full"
          >
            <span className="shipping-return-icon mb-2">{point.icon}</span>
            <span className="font-bold text-lg" style={{ color: point.color }}>
              {point.label}
            </span>
            <span className="text-gray-700 text-base">{point.text}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default ShippingAndReturn;
