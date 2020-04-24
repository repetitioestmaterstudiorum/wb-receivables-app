import React, { useState } from "react";
import Invoice from "../components/Invoice";
import Payment from "../components/Payment";
import { useTracker } from "meteor/react-meteor-data";
import { InvoicesCollection } from "../../api/invoices";
import { PaymentsCollection } from "../../api/payments";
import "../../api/invPaymentPairs";
import { Container, Row, Col } from "react-bootstrap";

const Splitview = () => {
  // initial data from mongodb
  Meteor.subscribe("invoices");
  Meteor.subscribe("payments");
  const invoices = useTracker(() => {
    return InvoicesCollection.find(
      {
        isConsolidated: { $ne: true },
        isDeleted: { $ne: true },
      },
      { sort: { invdate: 1 } }
    ).fetch();
  });
  const payments = useTracker(() => {
    return PaymentsCollection.find(
      {
        isConsolidated: { $ne: true },
        isDeleted: { $ne: true },
        subject: "Zahlungseingang",
      },
      { sort: { transactionDate: 1 } }
    ).fetch();
  });
  // bank account balances
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

  // checked states
  const [checkedInvoices, setCheckedInvoices] = useState([]);
  const [checkedPayments, setCheckedPayments] = useState([]);
  const handleInvoiceCheckbox = (invoiceId) => {
    checkedInvoices.length === 0
      ? setCheckedInvoices([...checkedInvoices, invoiceId])
      : setCheckedInvoices(
          checkedInvoices.includes(invoiceId)
            ? checkedInvoices.filter((element) => element !== invoiceId)
            : [...checkedInvoices, invoiceId]
        );
  };
  const handlePaymentCheckbox = (paymentId) => {
    checkedPayments.length === 0
      ? setCheckedPayments([...checkedPayments, paymentId])
      : setCheckedPayments(
          checkedPayments.includes(paymentId)
            ? checkedPayments.filter((element) => element !== paymentId)
            : [...checkedPayments, paymentId]
        );
  };

  // mark deleted or paired
  const handleDelete = () => {
    if (checkedInvoices.length === 0 && checkedPayments.length === 0) {
      alert("Choose invoices/payements to delete");
    }
    if (checkedInvoices.length !== 0) {
      checkedInvoices.forEach((element) =>
        Meteor.call("markInvoiceDeleted", element)
      );
      setCheckedInvoices([]);
    }
    if (checkedPayments.length !== 0) {
      checkedPayments.forEach((element) =>
        Meteor.call("markPaymentDeleted", element)
      );
      setCheckedPayments([]);
    }
  };
  const handlePair = () => {
    console.log("checkedInvoices", checkedInvoices);
    console.log("checkedPayments", checkedPayments);
    if (checkedInvoices.length === 0 || checkedPayments.length === 0) {
      alert("Choose one invoice and one payment to pair");
    } else if (checkedInvoices.length > 1 || checkedPayments.length > 1) {
      alert("You can only pair one invoice and one payment at a time");
    } else {
      console.log("one invoice and one payment chosen");
      const pairObject = {
        createdAt: new Date(),
        invoiceId: checkedInvoices[0],
        paymentId: checkedPayments[0],
      };
      Meteor.call("addPair", pairObject);
    }
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
          {invoices.length === 0 ? (
            <p>No new invoices..</p>
          ) : (
            <ul>
              {invoices &&
                invoices.map((invoice) => (
                  <Invoice
                    invoice={invoice}
                    key={invoice._id}
                    handleInvoiceCheckbox={handleInvoiceCheckbox}
                  />
                ))}
            </ul>
          )}
        </Col>
        <Col sm={5}>
          <h2>Payments</h2>
          {payments.length === 0 ? (
            <p>No new payments..</p>
          ) : (
            <ul>
              {payments &&
                payments.map((payment) => (
                  <Payment
                    payment={payment}
                    key={payment._id}
                    handlePaymentCheckbox={handlePaymentCheckbox}
                  />
                ))}
            </ul>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Splitview;
