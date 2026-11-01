import { useState } from "react";
import Header from "./components/Header/Header";
import LoginForm from "./components/Auth/Login/LoginForm";
import { useAuth } from "./context/AuthContext";
import Profile from "./components/Profile/Profile";

const App = () => {
  const { isLoggedIn, logout, isLoading } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  function showProfileHandler() {
    setShowProfile(true);
  }

  function logoutHandler() {
    logout();
    setShowProfile(false);
  }

  // Wait until Firebase finishes validating the token
  if (isLoading) {
    return <div>Checking authentication...</div>;
  }

  return (
    <>
      <Header onShowProfile={showProfileHandler} onLogout={logoutHandler} />

      {!isLoggedIn && <LoginForm />}

      {isLoggedIn && showProfile && <Profile />}

      {isLoggedIn && !showProfile && (
        <div style={{ textAlign: "center" }}>
          <h2>Welcome!</h2>
          <p>You are logged in successfully.</p>
        </div>
      )}
    </>
  );
};

export default App;
