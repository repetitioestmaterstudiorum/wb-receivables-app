import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const Payment = (props) => {
  const {
    transactionDate,
    transactionCurrency,
    transaction,
    _id,
  } = props.payment;

  const handlePaymentCheckbox = () => {
    props.handlePaymentCheckbox(_id);
  };

  return (
    <li className="mb-2">
      <Form.Check.Label>
        <Form.Check.Input type="checkbox" onChange={handlePaymentCheckbox} />
        Payment: <strong>{transactionDate}</strong>
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
  payment: PropTypes.object,
  handlePaymentCheckbox: PropTypes.func,
};

export default Payment;
