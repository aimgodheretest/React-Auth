import { createContext, useContext, useEffect, useState } from "react";
import { checkTokenValidity } from "../services/auth";

const AuthContext = createContext(null);

const SESSION_DURATION = 5 * 60 * 1000;

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function validateToken() {
      const savedToken = localStorage.getItem("token");
      const loginTime = localStorage.getItem("loginTime");

      if (!savedToken || !loginTime) {
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("loginTime");
        setIsLoading(false);
        return;
      }

      const elapsedTime = Date.now() - Number(loginTime);

      // Check whether the 5-minute session has expired
      if (elapsedTime >= SESSION_DURATION) {
        logout();
        setIsLoading(false);
        return;
      }

      try {
        await checkTokenValidity(savedToken);
      } catch (error) {
        console.error("Token validation failed:", error.message);
        logout();
      } finally {
        setIsLoading(false);
      }
    }

    validateToken();
  }, []);

  // Called after successful login: start a new 5-minute session
  function setAuthToken(idToken) {
    setToken(idToken);
    localStorage.setItem("token", idToken);
    localStorage.setItem("loginTime", Date.now().toString());
  }

  // Update Firebase ID token without restarting the session
  function updateAuthToken(idToken) {
    setToken(idToken);
    localStorage.setItem("token", idToken);
  }

  // Clear authentication data during logout
  function logout() {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
  }

  const contextValue = {
    token,
    isLoggedIn: !!token,
    isLoading,
    setAuthToken,
    updateAuthToken,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
