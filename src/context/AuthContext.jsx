import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  // Store the Firebase ID token
  function setAuthToken(idToken) {
    setToken(idToken);
  }

  // Clear the token during logout
  function logout() {
    setToken(null);
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
