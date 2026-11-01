import { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { login } from "../services/auth";
import "./AuthForm.css";
import "./LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function submitHandler(e) {
    e.preventDefault();

    setIsLoading(true);
    setError("");

    try {
      const response = await login(email, password);

      // Development check: log only the ID token.
      console.log("Firebase ID Token:", response.idToken);

      alert("Login successful!");
    } catch (error) {
      console.error("Login error:", error.message);

      setError("Authentication failed. Please check your email and password.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="auth-page login-page">
      <div className="auth-card">
        <div className="auth-heading">
          <p className="auth-eyebrow">WELCOME BACK</p>
          <h2 className="auth-title">Login</h2>
        </div>

        {error && (
          <Alert variant="danger" className="auth-alert">
            {error}
          </Alert>
        )}

        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label className="auth-label">Email Address</Form.Label>

            <Form.Control
              className="auth-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="auth-label">Password</Form.Label>

            <Form.Control
              className="auth-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            type="submit"
            className="auth-submit w-100"
            disabled={isLoading}
          >
            {isLoading ? <Spinner animation="border" size="sm" /> : "Login"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
