import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { InvoiceCollection } from "../../api/invoices";
import { Container, Row, Col } from "react-bootstrap";

const Splitview = () => {
  const invoices = useTracker(() => {
    return InvoiceCollection.find().fetch();
  });

  return (
    <Container>
      <div>Splitview</div>
      <Row>
        <Col>
          {invoices.map((invoice, i) => (
            <div key={i}>
              <strong>{invoice.invnumber}</strong>
            </div>
          ))}
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Splitview;
