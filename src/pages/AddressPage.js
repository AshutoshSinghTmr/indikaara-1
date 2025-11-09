import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useCart } from "../context/CartContext";
import axios from "axios";

const AddressPage = () => {
  const navigate = useNavigate();
  const { items } = useCart();
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
    additionalInfo: "",
  });

  const [errors, setErrors] = useState({});

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state) {
      newErrors.state = "State is required";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "PIN code is required";
    } else if (!/^[1-9][0-9]{5}$/.test(formData.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit PIN code";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsCreatingOrder(true);
      setOrderError("");

      try {
        // Transform cart items to required format
        const orderProducts = items.map((item) => ({
          product: item._id, // MongoDB _id of the product
          quantity: 1, //item.quantity,
        }));

        // Create order payload
        const orderPayload = {
          products: orderProducts,
          shippingAddress: {
            fullName: formData.fullName,
            addressLine1: formData.addressLine1,
            addressLine2: formData.addressLine2,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            phone: formData.phone,
            email: formData.email,
            additionalInfo: formData.additionalInfo,
          },
        };

        // Call the create-pending order API
        const response = await axios.post(
          "/api/orders/create-pending",
          orderPayload
        );
        const { txnid, order } = response.data;

        // Store order data and address in localStorage
        localStorage.setItem("shippingAddress", JSON.stringify(formData));
        localStorage.setItem(
          "pendingOrder",
          JSON.stringify({
            txnid,
            totalPrice: order.totalPrice,
          })
        );

        // Navigate to checkout page with transaction ID
        navigate("/checkout", {
          state: {
            txnid,
            totalPrice: order.totalPrice,
          },
        });
      } catch (error) {
        console.error("Error creating order:", error);
        setOrderError(
          error.response?.data?.message ||
            "Failed to create order. Please try again."
        );
      } finally {
        setIsCreatingOrder(false);
      }
    }
  };

  return (
    <main className="container mx-auto max-w-3xl px-4 py-8 my-20 pt-24">
      <div className="bg-card-bg border border-border-color rounded-xl p-6 md:p-8">
        <h1 className="text-3xl font-bold text-primary mb-6">
          Shipping Address
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-text-secondary mb-2"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-background border border-border-color rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>

          {/* Address Line 1 */}
          <div>
            <label
              htmlFor="addressLine1"
              className="block text-sm font-medium text-text-secondary mb-2"
            >
              Address Line 1 *
            </label>
            <input
              type="text"
              id="addressLine1"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-background border border-border-color rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="House/Flat number, Building name, Street"
            />
            {errors.addressLine1 && (
              <p className="mt-1 text-sm text-red-500">{errors.addressLine1}</p>
            )}
          </div>

          {/* Address Line 2 */}
          <div>
            <label
              htmlFor="addressLine2"
              className="block text-sm font-medium text-text-secondary mb-2"
            >
              Address Line 2
            </label>
            <input
              type="text"
              id="addressLine2"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-background border border-border-color rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Area, Locality (optional)"
            />
          </div>

          {/* City and State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                City *
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-background border border-border-color rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter city name"
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-500">{errors.city}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                State *
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-background border border-border-color rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select State</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className="mt-1 text-sm text-red-500">{errors.state}</p>
              )}
            </div>
          </div>

          {/* PIN Code */}
          <div>
            <label
              htmlFor="pincode"
              className="block text-sm font-medium text-text-secondary mb-2"
            >
              PIN Code *
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-background border border-border-color rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="6-digit PIN code"
              maxLength="6"
            />
            {errors.pincode && (
              <p className="mt-1 text-sm text-red-500">{errors.pincode}</p>
            )}
          </div>

          {/* Phone and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-background border border-border-color rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="10-digit mobile number"
                maxLength="10"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-background border border-border-color rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <label
              htmlFor="additionalInfo"
              className="block text-sm font-medium text-text-secondary mb-2"
            >
              Additional Information
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-2 bg-background border border-border-color rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Any special instructions for delivery (optional)"
            ></textarea>
          </div>

          {/* Error Message */}
          {orderError && (
            <div className="p-4 mb-6 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {orderError}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-4 pt-4">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => navigate(-1)}
              type="button"
              disabled={isCreatingOrder}
            >
              Back to Cart
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              type="submit"
              disabled={isCreatingOrder}
            >
              {isCreatingOrder ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating Order...
                </span>
              ) : (
                "Continue to Payment"
              )}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddressPage;
