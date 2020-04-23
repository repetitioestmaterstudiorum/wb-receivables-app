import React, { useState } from "react";
import { InvoicesCollection } from "../../api/invoices";
import { PaymentsCollection } from "../../api/payments";
import { useTracker } from "meteor/react-meteor-data";
import Invoice from "../components/Invoice";
import Payment from "../components/Payment";
import { Container, Row, Col } from "react-bootstrap";

const Deleted = () => {
  // initial data from mongodb
  Meteor.subscribe("invoices");
  Meteor.subscribe("payments");
  const invoices = useTracker(() => {
    return InvoicesCollection.find(
      { isConsolidated: { $ne: true }, isDeleted: true },
      { sort: { invdate: -1 } }
    ).fetch();
  });
  const payments = useTracker(() => {
    return PaymentsCollection.find(
      { isConsolidated: { $ne: true }, isDeleted: true },
      { sort: { transactionDate: -1 } }
    ).fetch();
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

  // restore
  const handleRestore = () => {
    if (checkedInvoices.length !== 0) {
      checkedInvoices.forEach((element) =>
        Meteor.call("markNotDeleted", element)
      );
      setCheckedInvoices([]);
    }
  };

  return (
    <Container>
      <button
        className="btn btn-outline-success btn-sm mb-2 mr-2"
        onClick={handleRestore}
      >
        Restore
      </button>
      <Row>
        <Col sm={7}>
          <ul>
            {invoices.map((invoice) => (
              <Invoice
                invoice={invoice}
                key={invoice._id}
                handleInvoiceCheckbox={handleInvoiceCheckbox}
              />
            ))}
          </ul>
        </Col>
        <Col sm={5}>
          <ul>
            {payments.map((payment, i) => (
              <Payment
                payment={payment}
                key={payment._id}
                handlePaymentCheckbox={handlePaymentCheckbox}
              />
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Deleted;
