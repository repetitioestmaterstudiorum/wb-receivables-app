import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Counter from "../components/Counter";
import Links from "../components/Links";

const Landing = () => {
  return (
    <Container>
      <Row>
        <Counter />
        <Links />
      </Row>
      <Row>Landing</Row>
      <Row>
        <Col>Login</Col>
        <Col>Registrierung</Col>
      </Row>
    </Container>
  );
};

export default Landing;
