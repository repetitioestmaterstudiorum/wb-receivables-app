import React from "react";
import PropTypes from "prop-types";
import moment from "moment-timezone";
import { Form } from "react-bootstrap";

const Invoice = ({ props }) => {
  const {
    invnumber,
    invdate,
    status,
    duedate,
    amount,
    currency,
    customername,
    description,
  } = props;

  const now = Date.now();
  const tMinus = now - Date.parse(duedate);
  const tMinusDays = (tMinus / 1000 / 60 / 60 / 24) * -1;
  const tMinusDaysRounded = Math.round(tMinusDays);

  return (
    <li>
      <Form.Check.Label>
        <Form.Check.Input type="checkbox" />
        <p
          style={
            tMinusDaysRounded > 0 ? { color: "black" } : { color: "#de5300" }
          }
        >
          <strong>{invnumber}</strong>, {moment(invdate).format("DD.MM.YYYY")}
        </p>
      </Form.Check.Label>
      <p>
        Due: {moment(duedate).format("DD.MM.YYYY")} (
        <strong>in {tMinusDaysRounded} days</strong>)
      </p>
      <p>
        <strong>{customername}</strong>, {description}
      </p>
      <p>
        <strong>
          {currency} {amount}{" "}
        </strong>{" "}
        - {status}
      </p>
      <br />
    </li>
  );
};

// const openInvoice = {
//   color: "black",
// };
// const overdueInvoice = {
//   color: "red",
// };

propTypes = {
  invoice: PropTypes.object,
};

export default Invoice;
