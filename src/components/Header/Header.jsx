import { Navbar, Container, Button } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

function Header({ onShowProfile, onLogout }) {
  const { isLoggedIn } = useAuth();

  return (
    <Navbar className="auth-navbar">
      <Container>
        <Navbar.Brand className="auth-brand">React Auth</Navbar.Brand>

        <div className="auth-nav-actions">
          {isLoggedIn ? (
            <>
              <Button className="profile-btn" onClick={onShowProfile}>
                Profile
              </Button>

              <Button className="logout-btn" onClick={onLogout}>
                Logout
              </Button>
            </>
          ) : (
            <span className="login-nav-label">Login</span>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
