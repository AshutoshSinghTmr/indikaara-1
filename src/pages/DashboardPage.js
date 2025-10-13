import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import LoyaltyIcon from "@mui/icons-material/Loyalty";

const DashboardPage = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("orders"); // 'orders' | 'addresses'
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);

  // Derived caption for breadcrumb
  const breadcrumb = useMemo(
    () => (activeTab === "orders" ? "Account" : "Addresses"),
    [activeTab]
  );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchOrders = async () => {
      try {
        setOrdersLoading(true);
        const res = await axios.get("/api/orders/my");
        setOrders(Array.isArray(res.data) ? res.data : res.data?.orders || []);
      } catch (e) {
        setOrders([]);
      } finally {
        setOrdersLoading(false);
      }
    };
    fetchOrders();
  }, [isAuthenticated]);

  // Seed one default address from user data if available (local-only demo)
  useEffect(() => {
    if (addresses.length === 0) {
      setAddresses((prev) => {
        if (prev.length) return prev;
        return [
          {
            id: "default",
            name: user?.name || "Anonymous",
            country: "India",
            isDefault: true,
          },
        ];
      });
    }
  }, [user, addresses.length]);

  const addAddress = () => {
    const name = window.prompt("Full Name", user?.name || "");
    if (!name) return;
    const country = window.prompt("Country", "India") || "India";
    setAddresses((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name,
        country,
        isDefault: prev.length === 0,
      },
    ]);
  };

  const editAddress = (id) => {
    const addr = addresses.find((a) => a.id === id);
    if (!addr) return;
    const name = window.prompt("Full Name", addr.name) || addr.name;
    const country = window.prompt("Country", addr.country) || addr.country;
    setAddresses((prev) =>
      prev.map((a) => (a.id === id ? { ...a, name, country } : a))
    );
  };

  const deleteAddress = (id) => {
    if (!window.confirm("Delete this address?")) return;
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const setDefault = (id) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  return (
    <div className="min-h-screen bg-white py-6 md:py-8 lg:py-10 px-4 sm:px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Top bar: Tabs + Logout */}
        <div className="flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-8">
            <button
              className={`relative py-4 text-sm md:text-base font-semibold ${
                activeTab === "orders"
                  ? "text-black"
                  : "text-gray-500 hover:text-black"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              Orders
              {activeTab === "orders" && (
                <span className="absolute left-0 -bottom-px h-[2px] w-full bg-black" />
              )}
            </button>
            <button
              className={`relative py-4 text-sm md:text-base font-semibold ${
                activeTab === "addresses"
                  ? "text-black"
                  : "text-gray-500 hover:text-black"
              }`}
              onClick={() => setActiveTab("addresses")}
            >
              Addresses
              {activeTab === "addresses" && (
                <span className="absolute left-0 -bottom-px h-[2px] w-full bg-black" />
              )}
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm md:text-base font-medium text-gray-600 hover:text-black"
          >
            Logout
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mt-4">
          <span
            onClick={() => navigate("/")}
            className="cursor-pointer hover:text-black"
          >
            Home
          </span>
          <span className="mx-2">›</span>
          <span className="text-black">{breadcrumb}</span>
        </div>

        {/* User info */}
        <div className="mt-6 border border-gray-200 rounded-md px-4 py-4 flex items-start justify-between">
          <div>
            <div className="text-base md:text-lg font-semibold text-black">
              {`Welcome, ${
                user?.name ||
                user?.userName ||
                [user?.given_name, user?.family_name]
                  .filter(Boolean)
                  .join(" ") ||
                (user?.email ? user.email.split("@")[0] : "Anonymous")
              }`}
            </div>
            <div className="mt-1 text-sm text-gray-600 flex items-center gap-2">
              {user?.email || "No email on file"}
              {(user?.emailVerified || user?.email_verified) && (
                <VerifiedIcon fontSize="small" sx={{ color: "#16a34a" }} />
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-10">
          {activeTab === "orders" && (
            <div className="flex flex-col items-center justify-center py-20">
              {/* Box icon */}
              <div className="relative mb-12">
                <span className="absolute -top-2 -right-3 text-xs bg-black text-white rounded-full px-2 py-0.5">
                  {orders?.length || 0}
                </span>
                <svg
                  width="46"
                  height="46"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="text-black/80"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z" />
                  <path d="m7.5 4.21 9 5.19" />
                  <polyline points="3.29 7 12 12 20.71 7" />
                  <line x1="12" y1="22" x2="12" y2="12" />
                </svg>
              </div>
              <p className="text-lg md:text-xl text-black mb-4">
                {ordersLoading
                  ? "Loading your orders..."
                  : orders?.length
                  ? `You have ${orders.length} orders.`
                  : "You haven't placed any orders yet."}
              </p>
              <button
                onClick={() => navigate("/catalogue")}
                className="mt-2 bg-[#ac1f23] hover:bg-[#a46840] text-white font-semibold px-6 py-3 rounded"
              >
                Continue shopping
              </button>

              {/* Benefits row */}
              <div className="flex flex-col sm:flex-row gap-10 mt-20 text-center text-black/80">
                <div>
                  <div className="flex justify-center mb-3">
                    <LoyaltyIcon fontSize="large" sx={{ color: "#ac1f23" }} />
                  </div>
                  <h3 className="font-semibold tracking-wide">
                    PREMIUM & ETHICAL{" "}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Sourced ethically with the finest, authentic materials.
                  </p>
                </div>
                <div>
                  <div className="flex justify-center mb-3">
                    <VerifiedIcon fontSize="large" sx={{ color: "#ac1f23" }} />
                  </div>
                  <h3 className="font-semibold tracking-wide">
                    QUALITY ASSURED{" "}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Every piece undergoes a multi-point quality inspection.
                  </p>
                </div>
                <div>
                  <div className="flex justify-center mb-3">
                    <RocketLaunchIcon
                      fontSize="large"
                      sx={{ color: "#ac1f23" }}
                    />
                  </div>
                  <h3 className="font-semibold tracking-wide">
                    QUICK DISPATCH
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Orders dispatched within 48 hours
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "addresses" && (
            <div className="py-10">
              <h2 className="text-3xl md:text-4xl text-center font-semibold text-black">
                Addresses{" "}
                <span className="text-gray-400">{addresses.length}</span>
              </h2>

              <div className="max-w-2xl mx-auto mt-10 space-y-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="border border-gray-200 rounded-md p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="text-sm font-semibold text-gray-800">
                        {addr.isDefault ? "Default address" : "Address"}
                      </div>
                      <div className="mt-2 text-gray-700">
                        <div>{addr.name}</div>
                        <div>{addr.country}</div>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 flex items-center gap-4 text-sm">
                      {!addr.isDefault && (
                        <button
                          onClick={() => setDefault(addr.id)}
                          className="text-gray-600 hover:text-black"
                        >
                          Make default
                        </button>
                      )}
                      <button
                        onClick={() => editAddress(addr.id)}
                        className="text-gray-600 hover:text-black"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="text-gray-600 hover:text-black"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <button
                  onClick={addAddress}
                  className="bg-[#ac1f23] hover:bg-[#a46840] text-white font-semibold px-6 py-3 rounded"
                >
                  Add address
                </button>
              </div>

              {/* Benefits row (mirrors screenshot layout) */}
              <div className="flex flex-col sm:flex-row gap-10 mt-20 text-center text-black/80 ">
                <div>
                  <div className="flex justify-center mb-3">
                    <LoyaltyIcon fontSize="large" sx={{ color: "#ac1f23" }} />
                  </div>
                  <h3 className="font-semibold tracking-wide">
                    PREMIUM & ETHICAL{" "}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Sourced ethically with the finest, authentic materials.
                  </p>
                </div>
                <div>
                  <div className="flex justify-center mb-3">
                    <VerifiedIcon fontSize="large" sx={{ color: "#ac1f23" }} />
                  </div>
                  <h3 className="font-semibold tracking-wide">
                    QUALITY ASSURED{" "}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Every piece undergoes a multi-point quality inspection.
                  </p>
                </div>
                <div>
                  <div className="flex justify-center mb-3">
                    <RocketLaunchIcon
                      fontSize="large"
                      sx={{ color: "#ac1f23" }}
                    />
                  </div>
                  <h3 className="font-semibold tracking-wide">
                    QUICK DISPATCH
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Orders dispatched within 48 hours
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
