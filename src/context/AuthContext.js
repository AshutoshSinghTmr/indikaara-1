import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Use relative URLs to work with proxy in development
// In production, this will be set via environment variables
if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL =
    process.env.REACT_APP_API_URL || "https://backend-wei5.onrender.com";
} else {
  // In development, use proxy - no baseURL needed
  axios.defaults.baseURL = "";
}

const SECONDS_TO_MILLISECONDS = 1000;

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Set up axios interceptor to include auth token
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => axios.interceptors.request.eject(interceptor);
  }, [token]);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * SECONDS_TO_MILLISECONDS > Date.now()) {
          // Try to get stored user profile data first
          const storedUserProfile = localStorage.getItem("userProfile");
          if (storedUserProfile) {
            const userProfile = JSON.parse(storedUserProfile);
            // Combine stored profile with current token info
            setUser({
              ...userProfile,
              token: token,
              id: decoded.id || userProfile.googleId,
              iat: decoded.iat,
              exp: decoded.exp,
            });
          } else {
            // Fallback to JWT payload if no stored profile
            setUser(decoded);
          }
        } else {
          logout();
        }
      } catch (error) {
        logout();
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      const { token, accessToken, user: userPayload } = response.data || {};
      const jwt = token || accessToken;

      if (!jwt) {
        return {
          success: false,
          error: "Login failed: missing token in response",
        };
      }

      localStorage.setItem("token", jwt);
      setToken(jwt);

      // Prefer decoded JWT for expiry/claims; merge with user payload if present
      const decoded = jwtDecode(jwt);
      const mergedUser = userPayload ? { ...decoded, ...userPayload } : decoded;
      setUser(mergedUser);

      // Persist profile if provided (optional)
      if (userPayload) {
        localStorage.setItem("userProfile", JSON.stringify(userPayload));
      }

      // Fetch full profile after login
      await fetchUserProfile(jwt);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      const { token, accessToken, user: userPayload } = response.data || {};
      const jwt = token || accessToken;
      if (!jwt) {
        return {
          success: false,
          error: "Registration failed: missing token in response",
        };
      }
      localStorage.setItem("token", jwt);
      setToken(jwt);
      const decoded = jwtDecode(jwt);
      const mergedUser = userPayload ? { ...decoded, ...userPayload } : decoded;
      setUser(mergedUser);
      if (userPayload) {
        localStorage.setItem("userProfile", JSON.stringify(userPayload));
      }
      // Fetch full profile after registration
      await fetchUserProfile(jwt);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const googleLogin = async (googleToken, userProfile = null) => {
    try {
      const requestData = { token: googleToken };
      if (userProfile) {
        requestData.userProfile = userProfile;
      }

      const response = await axios.post("/api/auth/google", requestData);
      const { token } = response.data;
      localStorage.setItem("token", token);
      setToken(token);

      // If we have user profile data, use it instead of just the JWT payload
      if (userProfile) {
        // Store the full Google user profile with the token info
        const userData = {
          ...userProfile,
          token: token,
          // Add JWT payload info for completeness
          id: jwtDecode(token).id || userProfile.googleId,
          iat: jwtDecode(token).iat,
          exp: jwtDecode(token).exp,
        };
        setUser(userData);
        // Store user profile in localStorage for persistence
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
      } else {
        // Fallback to JWT payload if no profile data
        const decoded = jwtDecode(token);
        setUser(decoded);
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Google login failed",
      };
    }
  };

  // Fetch current user profile from backend (optionally using a provided token)
  const fetchUserProfile = async (overrideToken) => {
    const authToken = overrideToken || token;
    if (!authToken) {
      return { success: false, error: "Missing auth token" };
    }
    try {
      const response = await axios.get("/api/users/me", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const profile = response.data;
      try {
        localStorage.setItem("userProfile", JSON.stringify(profile));
      } catch {}
      setUser((prev) => ({ ...prev, ...profile }));
      return { success: true, data: profile };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to fetch profile",
      };
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put("/api/users/me", profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser((prev) => ({ ...prev, ...response.data }));
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to update profile",
      };
    }
  };

  // Demo login for development/testing
  const demoLogin = async () => {
    try {
      const response = await axios.post("/api/auth/demo-login");
      const { token } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      const decoded = jwtDecode(token);
      setUser(decoded);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Demo login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userProfile");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    googleLogin,
    logout,
    fetchUserProfile,
    updateProfile,
    demoLogin,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
