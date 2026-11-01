import { Container, Card } from "react-bootstrap";
import ChangePasswordForm from "./ChangePasswordForm";
import "./Profile.css";
import "./ChangePasswordForm.css";

function Profile() {
  return (
    <Container className="profile-page">
      <Card className="profile-card">
        <Card.Body>
          <h2 className="profile-title">Your User Profile</h2>

          <p className="profile-message">
            Welcome! You are successfully logged in.
          </p>

          <p className="profile-status">Authentication Status: Active</p>

          <hr />

          <ChangePasswordForm />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;
