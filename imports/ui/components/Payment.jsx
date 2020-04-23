import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const Payment = ({ props }) => {
  const {
    subject,
    transactionDate,
    transactionCurrency,
    transaction,
    newBalance,
  } = props;

  return (
    <li>
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
      <br />
    </li>
  );
};

propTypes = {
  invoice: PropTypes.object,
};

export default Payment;
