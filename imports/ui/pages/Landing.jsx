import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Loader from "../components/Loader";

const Landing = () => {
  const { logIn, isLoading, setIsLoading } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Enter email and password");
    } else {
      setIsLoading(true);
      logIn(email, password);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <Container>
      <h1>Login: </h1>
      <Row>
        {isLoading ? (
          <Loader />
        ) : (
          <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <Col sm={12} md={6}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={handleEmailChange}
                  value={email}
                />
              </Form.Group>
            </Col>
            <Col sm={12} md={6}>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  onChange={handlePasswordChange}
                  value={password}
                />
              </Form.Group>
            </Col>
            <Col>
              <Button variant="warning" type="submit">
                Submit
              </Button>
            </Col>
          </Form>
        )}
      </Row>
    </Container>
  );
};

export default Landing;
