import React from "react";
import PropTypes from "prop-types";
import moment from "moment-timezone";

const Invoice = ({ props }) => {
  const {
    invnumber,
    invdate,
    status,
    duedate,
    amount,
    currency,
    paid,
    customername,
    description,
  } = props;

  return (
    <div>
      <strong>{invnumber}</strong>
      <p>Invoice date: {moment(invdate).format("DD.MM.YYYY")}</p>
      <p>Due date: {moment(duedate).format("DD.MM.YYYY")}</p>
      <p>Status: {status}</p>
      <p>Customer: {customername}</p>
      <p>Invoice for: {description}</p>
      <p>
        Amount: {currency} {amount}
      </p>
      <p>
        Already paid: {currency} {paid}
      </p>
      <br />
    </div>
  );
};

propTypes = {
  invoice: PropTypes.object,
};

export default Invoice;
