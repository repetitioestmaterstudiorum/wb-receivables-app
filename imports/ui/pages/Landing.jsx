import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Counter from "../components/Counter";
import Links from "../components/Links";

const Landing = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Counter />
        </Col>
        <Col>
          <Links />
        </Col>
      </Row>
      <Row>
        <Col>Landing</Col>
      </Row>
      <Row>
        <Col>Login</Col>
      </Row>
    </Container>
  );
};

export default Landing;
