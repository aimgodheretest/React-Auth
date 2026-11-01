import { createContext, useContext, useEffect, useState } from "react";
import { checkTokenValidity } from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function validateToken() {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        await checkTokenValidity(token);
      } catch (error) {
        console.error("Token validation failed:", error.message);

        setToken(null);
        localStorage.removeItem("token");
      } finally {
        setIsLoading(false);
      }
    }

    validateToken();
  }, []);

  function setAuthToken(idToken) {
    setToken(idToken);
    localStorage.setItem("token", idToken);
  }

  function logout() {
    setToken(null);
    localStorage.removeItem("token");
  }

  const contextValue = {
    token,
    isLoggedIn: !!token,
    isLoading,
    setAuthToken,
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
