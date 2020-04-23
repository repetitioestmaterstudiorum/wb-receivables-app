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
      {
        isConsolidated: { $ne: true },
        isDeleted: { $ne: true },
      },
      { sort: { invdate: 1 } }
    ).fetch();
  });
  Meteor.subscribe("payments");
  const payments = useTracker(() => {
    return PaymentsCollection.find(
      {
        isConsolidated: { $ne: true },
        isDeleted: { $ne: true },
      },
      { sort: { transactionDate: 1 } }
    ).fetch();
  });
  const eurBalanceObject = useTracker(() => {
    return PaymentsCollection.findOne(
      { transactionCurrency: "EUR" },
      { sort: { createdAt: -1, limit: 1 } }
    );
  });
  const chfBalanceObject = useTracker(() => {
    return PaymentsCollection.findOne(
      { transactionCurrency: "CHF" },
      { sort: { createdAt: -1, limit: 1 } }
    );
  });

  const handleDelete = () => {
    console.log("delete");
  };
  const handlePair = () => {
    console.log("pair");
  };

  return (
    <Container>
      <h1>
        Balances: <u>EUR {eurBalanceObject && eurBalanceObject.newBalance}</u>,{" "}
        <u>CHF {chfBalanceObject && chfBalanceObject.newBalance}</u>
      </h1>
      <button
        className="btn btn-outline-success btn-sm mb-2 mr-2"
        onClick={handlePair}
      >
        Pair
      </button>
      <button
        className="btn btn-outline-info btn-sm mb-2"
        onClick={handleDelete}
      >
        Delete
      </button>
      <Row>
        <Col sm={7}>
          <h2>Invoices</h2>
          <ul>
            {invoices.map((invoice) => (
              <Invoice invoiceProps={invoice} key={invoice._id} />
            ))}
          </ul>
        </Col>
        <Col sm={5}>
          <h2>Payments</h2>
          <ul>
            {payments.map((payment) => (
              <Payment paymentProps={payment} key={payment._id} />
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Splitview;
