import React from "react";
import { Hello } from "./Hello.jsx";
import { Info } from "./Info.jsx";
import { Container, Row, Col } from "react-bootstrap";

export const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <Container>
      <Row>
        <Col>1 of 2</Col>
        <Col>2 of 2</Col>
      </Row>
      <Row>
        <Col>1 of 3</Col>
        <Col>2 of 3</Col>
        <Col>3 of 3</Col>
      </Row>
    </Container>
    <Hello />
    <Info />
  </div>
);
