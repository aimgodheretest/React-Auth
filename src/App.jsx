import { useState } from "react";
import Header from "./components/Header/Header";
import LoginForm from "./components/Auth/Login/LoginForm";
import { useAuth } from "./context/AuthContext";
import Profile from "./components/Profile/Profile";

const App = () => {
  const { isLoggedIn, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  function showProfileHandler() {
    setShowProfile(true);
  }

  function logoutHandler() {
    logout();
    setShowProfile(false);
  }

  return (
    <>
      <Header onShowProfile={showProfileHandler} onLogout={logoutHandler} />

      {!isLoggedIn && <LoginForm />}

      {isLoggedIn && showProfile && <Profile />}

      {isLoggedIn && !showProfile && (
        <div>
          <h2>Welcome!</h2>
          <p>You are logged in successfully.</p>
        </div>
      )}
    </>
  );
};

export default App;
