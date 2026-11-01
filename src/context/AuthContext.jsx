import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Load the existing token from localStorage when the app initializes
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  // Store the Firebase ID token in state and localStorage
  function setAuthToken(idToken) {
    setToken(idToken);
    localStorage.setItem("token", idToken);
  }

  // Clear the token during logout
  function logout() {
    setToken(null);
    localStorage.removeItem("token");
  }

  const contextValue = {
    token,
    isLoggedIn: !!token,
    setAuthToken,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// Custom hook to access authentication context
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
