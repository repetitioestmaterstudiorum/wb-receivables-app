import React, { useState } from "react";
import Invoice from "../components/Invoice";
import Payment from "../components/Payment";
import { useTracker } from "meteor/react-meteor-data";
import { InvoicesCollection } from "../../api/invoices";
import { PaymentsCollection } from "../../api/payments";
import "../../api/invPaymentPairs";
import { Container, Row, Col } from "react-bootstrap";

const Open = () => {
  // initial data from mongodb
  Meteor.subscribe("invoices");
  Meteor.subscribe("payments");
  const invoices = useTracker(() => {
    return InvoicesCollection.find(
      {
        isPaired: { $ne: true },
        isDeleted: { $ne: true },
      },
      { sort: { invdate: 1 } }
    ).fetch();
  });
  const payments = useTracker(() => {
    return PaymentsCollection.find(
      {
        isPaired: { $ne: true },
        isDeleted: { $ne: true },
        subject: "Zahlungseingang",
      },
      { sort: { transactionDate: 1 } }
    ).fetch();
  });

  // bank account balances
  const chfBalanceObject = useTracker(() => {
    return PaymentsCollection.findOne(
      { transactionCurrency: "CHF" },
      { sort: { createdAt: -1, limit: 1 } }
    );
  });
  const eurBalanceObject = useTracker(() => {
    return PaymentsCollection.findOne(
      { transactionCurrency: "EUR" },
      { sort: { createdAt: -1, limit: 1 } }
    );
  });

  // receivable totals
  const getReceivableTotal = (currency) => {
    return invoices
      .filter((invoice) => invoice.currency === currency)
      .map((invoices) => parseFloat(invoices.amount))
      .reduce((a, b) => a + b, 0);
  };
  const chfReceivableTotal = getReceivableTotal("CHF");
  const eurReceivableTotal = getReceivableTotal("EUR");

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
    if (checkedInvoices.length === 0 || checkedPayments.length === 0) {
      alert("Choose one invoice and one payment to pair");
    } else if (checkedInvoices.length > 1 || checkedPayments.length > 1) {
      alert("You can only pair one invoice and one payment at a time");
    } else {
      // get relevant invoice and payment info
      const invoice = invoices.find(
        (invoice) => invoice._id === checkedInvoices[0]
      );
      const payment = payments.find(
        (payment) => payment._id === checkedPayments[0]
      );
      // prepair data object and create a pair
      const pairObject = {
        invoiceNumber: invoice.invnumber,
        invoiceDate: invoice.invdate,
        customer: invoice.customername,
        invoiceAmount: invoice.amount,
        currency: invoice.currency,
        paymentDate: payment.transactionDate,
        invoiceId: invoice._id,
        paymentId: payment._id,
        createdAt: new Date(),
      };
      Meteor.call("addPair", pairObject);
      Meteor.call("invoiceIsPaired", checkedInvoices[0]);
      Meteor.call("paymentIsPaired", checkedPayments[0]);
      setCheckedInvoices([]);
      setCheckedPayments([]);
    }
  };

  return (
    <Container>
      <h1>
        Balances: <u>CHF {chfBalanceObject && chfBalanceObject.newBalance}</u>,{" "}
        <u>EUR {eurBalanceObject && eurBalanceObject.newBalance}</u>
      </h1>
      <p>
        Total receivables: CHF {chfReceivableTotal}, EUR {eurReceivableTotal}
      </p>
      <hr style={{ marginTop: "0.2rem", marginBottom: "0.7rem" }} />
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

export default Open;
