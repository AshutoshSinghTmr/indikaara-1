import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import "../styles/LoginPage.css"; // Assuming we have CSS for styling
import loginBackground from "../assets/hero-vintage-1.png";
import { Button, Divider } from "@mui/material";
import Backdrop from "../components/Backdrop";

const GOOGLE_PROFILE_CLEAR_DELAY = 2000;

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleUserProfile, setGoogleUserProfile] = useState(null);
  const { login, register, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleSuccess = useCallback(
    async (response) => {
      setLoading(true);
      setError("");

      try {
        // Decode Google JWT token to extract user profile information
        const googleUser = jwtDecode(response.credential);

        // Extract user profile data from Google JWT
        const userProfile = {
          googleId: googleUser.sub,
          userName: googleUser.name,
          email: googleUser.email,
          picture: googleUser.picture,
          emailVerified: googleUser.email_verified,
          givenName: googleUser.given_name,
          familyName: googleUser.family_name,
          locale: googleUser.locale,
          issuedAt: new Date(googleUser.iat * 1000),
          expiresAt: new Date(googleUser.exp * 1000),
        };

        // Store the profile data for display
        setGoogleUserProfile(userProfile);

        // Log the extracted user profile information
        console.log("🎯 Google User Profile Extracted:", userProfile);

        // Proceed with existing authentication flow
        const result = await googleLogin(response.credential, userProfile);
        if (result.success) {
          // Clear profile data after successful login
          setTimeout(
            () => setGoogleUserProfile(null),
            GOOGLE_PROFILE_CLEAR_DELAY
          );
          navigate("/dashboard");
        } else {
          setError(result.error);
        }
      } catch (decodeError) {
        console.error("❌ Error decoding Google JWT:", decodeError);
        setError("Failed to process Google authentication data");
      } finally {
        setLoading(false);
      }
    },
    [googleLogin, navigate]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    const result = isLogin
      ? await login(email, password)
      : await register(userName, email, password);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Set mode based on path
    if (location.pathname === "/register") {
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
  }, [location.pathname, handleGoogleSuccess]);

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${loginBackground})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        marginTop: "100px !important",
      }}
    >
      <div className="max-w-md w-full my-28 bg-white p-8 rounded-lg opacity-95">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="text-2xl font-medium text-gray-900 mb-3">
            Customer Login
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Click below to log in or create an account.
          </p>
        </div>
        <div className="text-center m-2 text-cyan-900 font-bold">
          {isLogin ? "Login" : "Register"}
        </div>
        <Divider
          variant="middle"
          sx={{ color: "orange", marginBottom: "2rem" }}
        />
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="userName">Name</label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          {/* {isLogin && (
            <div className="form-group remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
          )} */}
          {error && <div className="error-message">{error}</div>}
          {/* <button type="submit" disabled={loading}>
            {loading ? "Loading..." : isLogin ? "Login" : "Register"}
          </button> */}
          {isLogin ? (
            <Button
              variant="contained"
              className="w-full"
              onClick={handleSubmit}
              disabled={false}
            >
              Login
            </Button>
          ) : (
            <Button
              variant="contained"
              className="w-full"
              onClick={handleSubmit}
              disabled={false}
            >
              Register
            </Button>
          )}
        </form>
        <div className="divider">or</div>
        <div id="google-signin-button"></div>

        {/* Google User Profile Display */}
        {googleUserProfile && (
          <div className="google-profile-display">
            <div className="profile-header">
              <h3>🎉 Google Profile Detected!</h3>
            </div>
            <div className="profile-content">
              <div className="profile-avatar">
                {googleUserProfile.picture ? (
                  <img
                    src={googleUserProfile.picture}
                    alt="Profile"
                    className="avatar-image"
                  />
                ) : (
                  <div className="avatar-placeholder">
                    {googleUserProfile.userName?.charAt(0)?.toUpperCase() ||
                      "U"}
                  </div>
                )}
              </div>
              <div className="profile-info">
                <div className="profile-name">
                  <strong>{googleUserProfile.userName}</strong>
                </div>
                <div className="profile-email">
                  {googleUserProfile.email}
                  {googleUserProfile.emailVerified && (
                    <span className="verified-badge">✓</span>
                  )}
                </div>
                <div className="profile-details">
                  <small>
                    Google ID: {googleUserProfile.googleId?.substring(0, 10)}...
                  </small>
                </div>
              </div>
            </div>
            <div className="profile-actions">
              <button
                type="button"
                className="continue-btn"
                onClick={() => navigate("/dashboard")}
              >
                Continue to Dashboard
              </button>
            </div>
          </div>
        )}

        <div className="toggle-mode text-stone-700 text-center mt-4">
          {isLogin ? (
            <p>
              Don't have an account?{" "}
              <button
                onClick={() => {
                  setIsLogin(false);
                  setEmail("");
                  setPassword("");
                  setError("");
                  setUserName("");
                  setConfirmPassword("");
                }}
              >
                Register Here!
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setIsLogin(true);
                  setEmail("");
                  setPassword("");
                  setError("");
                  setUserName("");
                  setConfirmPassword("");
                }}
              >
                Login Now!
              </button>
            </p>
          )}
        </div>
        {loading && <Backdrop loading={loading} />}
      </div>
    </div>
  );
};

export default LoginPage;
