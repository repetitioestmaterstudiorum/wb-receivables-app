import React from "react";
import PropTypes from "prop-types";

const Payment = ({ props }) => {
  const {
    subject,
    transactionDate,
    transactionCurrency,
    transaction,
    newBalance,
  } = props;

  return (
    <div>
      <strong>{subject}</strong>
      <p>Transaction date: {transactionDate}</p>
      <p>
        Amount: {transactionCurrency} {transaction}
      </p>
      <p>
        New balance: {transactionCurrency} {newBalance}
      </p>
      <br />
    </div>
  );
};

propTypes = {
  invoice: PropTypes.object,
};

export default Payment;
