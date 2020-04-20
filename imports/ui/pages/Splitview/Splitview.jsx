import React from "react";
import Invoice from "./Invoice";
import { useTracker } from "meteor/react-meteor-data";
import { InvoicesCollection } from "../../../api/invoices";
import { Container, Row, Col } from "react-bootstrap";

const Splitview = () => {
  Meteor.subscribe("invoices");
  const invoices = useTracker(() => {
    return InvoicesCollection.find({}, { sort: { invdate: -1 } }).fetch();
  });

  return (
    <Container>
      <Row>
        <Col lg={7}>
          {invoices.map((invoices, i) => (
            <Invoice props={invoices} key={i} />
          ))}
        </Col>
        <Col lg={5}>
          <p>Payment info</p>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default Splitview;
