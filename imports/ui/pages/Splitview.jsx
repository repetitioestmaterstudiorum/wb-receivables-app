import React from "react";
import Invoice from "../components/Invoice";
import Payment from "../components/Payment";
import { useTracker } from "meteor/react-meteor-data";
import { InvoicesCollection } from "../../api/invoices";
import { PaymentsCollection } from "../../api/payments";
import { Container, Row, Col } from "react-bootstrap";

const Splitview = () => {
  Meteor.subscribe("invoices");
  const invoices = useTracker(() => {
    return InvoicesCollection.find(
      { isConsolidated: { $ne: true }, isDeleted: { $ne: true } },
      { sort: { invdate: 1 } }
    ).fetch();
  });
  Meteor.subscribe("payments");
  const payments = useTracker(() => {
    return PaymentsCollection.find(
      { isConsolidated: { $ne: true }, isDeleted: { $ne: true } },
      { sort: { transactionDate: 1 } }
    ).fetch();
  });

  return (
    <Container>
      <h1>Splitview</h1>
      <Row>
        <Col sm={7}>
          <h2>Invoices</h2>
          <ul>
            {invoices.map((invoices, i) => (
              <Invoice props={invoices} key={i} />
            ))}
          </ul>
        </Col>
        <Col sm={5}>
          <h2>Payments</h2>
          <ul>
            {payments.map((payment, i) => (
              <Payment props={payment} key={i} />
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Splitview;
