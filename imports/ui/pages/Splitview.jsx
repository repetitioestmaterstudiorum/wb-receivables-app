import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import moment from "moment-timezone";
import { InvoiceCollection } from "../../api/invoices";
import { Container, Row, Col } from "react-bootstrap";

const Splitview = () => {
  Meteor.subscribe("invoices");

  const invoices = useTracker(() => {
    return InvoiceCollection.find().fetch();
  });

  return (
    <Container>
      <Row>
        <Col lg={7}>
          {invoices.map((invoice, i) => (
            <div key={i}>
              <strong>{invoice.invnumber}</strong>
              <p>
                Invoice date: {moment(invoice.transdate).format("DD.MM.YYYY")}
              </p>
              <p>Status: {invoice.status}</p>
              <p>Due date: {moment(invoice.duedate).format("DD.MM.YYYY")}</p>
              <p>Customer: {invoice.name}</p>
              <p>Invoice for: {invoice.description}</p>
              <p>
                Amount: {invoice.currency}
                {invoice.amount}
              </p>
              <p>
                Already paid: {invoice.currency}
                {invoice.paid}
              </p>
              <br />
            </div>
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
