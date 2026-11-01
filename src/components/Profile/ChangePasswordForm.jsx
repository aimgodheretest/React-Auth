import { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { updatePassword } from "../../services/auth";
import { useAuth } from "../../context/AuthContext";
import "./ChangePasswordForm.css";

function ChangePasswordForm() {
  const { token, updateAuthToken } = useAuth();

  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function submitHandler(e) {
    e.preventDefault();

    if (!token) {
      setError("You must be logged in to change your password.");
      return;
    }

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await updatePassword(token, newPassword);

      // Update Context with Firebase's newly issued ID token
      updateAuthToken(response.idToken);

      setSuccess("Password updated successfully!");
      setNewPassword("");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form onSubmit={submitHandler} className="change-password-form">
      {error && <Alert variant="danger">{error}</Alert>}

      {success && <Alert variant="success">{success}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label className="change-password-label">New Password</Form.Label>

        <Form.Control
          className="change-password-input"
          type="password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength={6}
        />
      </Form.Group>

      <Button
        type="submit"
        className="change-password-btn"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Spinner size="sm" animation="border" className="me-2" />
            Updating...
          </>
        ) : (
          "Change Password"
        )}
      </Button>
    </Form>
  );
}

export default ChangePasswordForm;
