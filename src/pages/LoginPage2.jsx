import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GoogleIcon from "@mui/icons-material/Google";
import loginBackground from "../assets/hero-vintage-1.png";
const GOOGLE_PROFILE_CLEAR_DELAY = 2000;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(true); // true for login, false for register
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [googleUserProfile, setGoogleUserProfile] = useState(null);
  const [googleProfileTimeout, setGoogleProfileTimeout] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await googleLogin();
      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.error || "Google login failed");
      }
    } catch (err) {
      setError("An error occurred during Google login");
    }

    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred during login");
    }

    setLoading(false);
  };

  useEffect(() => {
    // Set mode based on path
    if (window.location.pathname === "/register") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }

    // Initialize Google OAuth
    if (window.google && process.env.REACT_APP_GOOGLE_CLIENT_ID) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogleSuccess,
      });

      // Render the Google Sign-In button
      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        {
          theme: "outline",
          size: "large",
          text: "signin_with",
          shape: "rectangular",
        }
      );
    }
  }, []);

  const handleGoogleSuccess = () => {
    return null;
  };

  return (
    <>
      <main
        style={{
          backgroundImage: `url(${loginBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="min-h-screen w-full flex items-center justify-center px-4"
      >
        <div className="max-w-md w-full my-28 bg-white p-8 rounded-lg">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="text-2xl font-medium text-gray-900 mb-3">
              Customer Login
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Click below to log in or create an account.
            </p>
          </div>

          {/* Login/SignUp Tabs */}
          <div className="flex justify-center space-x-8 mb-8">
            <Link
              to="/signup"
              className="text-gray-500 hover:text-gray-700 pb-1"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="text-gray-900 border-b-2 border-gray-900 pb-1"
            >
              Log In
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 uppercase mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 uppercase"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-gray-600 italic hover:text-gray-800"
                >
                  Forgot your password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-700 text-white py-2 px-4 rounded-md hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "SIGN IN"}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
            >
              <GoogleIcon />
              Google Login
            </button>
          </div>

          {/* Privacy Policy */}
          <p className="mt-4 text-center text-xs text-gray-500">
            By clicking any of the social login buttons you agree to the terms
            of privacy policy described{" "}
            <Link
              to="/privacy-policy"
              className="text-blue-600 hover:underline"
            >
              here
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
