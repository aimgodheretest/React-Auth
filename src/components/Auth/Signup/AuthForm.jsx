import { useState } from "react";
import { Form, Button, Card, Container, Spinner, Alert } from "react-bootstrap";

import { signUp } from "../services/auth";
import "./AuthForm.css";

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");

    try {
      const response = await signUp(email, password);

      console.log("Signup successful:", response);

      alert("Account created successfully!");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="auth-page d-flex justify-content-center align-items-center">
      <Card className="auth-card p-4">
        <div className="auth-heading">
          <h3 className="auth-title">
            CREATE <span>ACCOUNT</span>
          </h3>
        </div>

        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-4">
            <Form.Label className="auth-label">YOUR EMAIL</Form.Label>

            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="auth-label">YOUR PASSWORD</Form.Label>

            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              required
            />
          </Form.Group>

          {error && (
            <Alert variant="danger" className="auth-alert">
              <span className="auth-alert-label">AUTHENTICATION FAILED</span>
              <div>{error}</div>
            </Alert>
          )}

          <Button
            type="submit"
            className="auth-submit w-100"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                SENDING REQUEST...
              </>
            ) : (
              <>
                CREATE ACCOUNT
                <span className="auth-button-arrow"></span>
              </>
            )}
          </Button>
        </Form>

        <div className="auth-footer">
          <span>HUMAN IDEAS</span>
          <span className="auth-footer-divider">|</span>
          <span>MACHINE POSSIBILITIES</span>
        </div>
      </Card>
    </Container>
  );
}

export default AuthForm;
