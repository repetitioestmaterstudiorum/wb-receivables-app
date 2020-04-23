import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const Payment = ({ paymentProps }) => {
  const { transactionDate, transactionCurrency, transaction } = paymentProps;

  return (
    <li className="mb-2">
      <Form.Check.Label>
        <Form.Check.Input type="checkbox" />
        Zahlung <strong>{transactionDate}</strong>
      </Form.Check.Label>
      <p>
        Amount:{" "}
        <strong>
          {transactionCurrency} {transaction}
        </strong>
      </p>
    </li>
  );
};

propTypes = {
  paymentProps: PropTypes.object,
};

export default Payment;
