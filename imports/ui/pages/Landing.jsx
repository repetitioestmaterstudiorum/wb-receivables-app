import React from "react";
import { Container, Row, Col, Accordion, Card } from "react-bootstrap";
import Counter from "../components/Counter";
import Links from "../components/Links";

const Landing = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Landing</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <form>Login</form>
        </Col>
      </Row>
      <br />
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Sample Content
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Row>
                <Col>
                  <Counter />
                </Col>
                <Col>
                  <Links />
                </Col>
              </Row>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Container>
  );
};

export default Landing;
