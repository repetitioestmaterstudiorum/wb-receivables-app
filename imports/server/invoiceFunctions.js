import axios from "axios";
import moment from "moment-timezone";
import { InvoiceCollection } from "../api/invoices";

export async function fetchInvoices() {
  const url = `https://service.runmyaccounts.com/api/latest/clients/webbutler/invoices/?status=OPEN&api_key=${process.env.RMA_API_KEY}`;
  try {
    const result = await axios.get(url);
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export const insertInvoices = (invoicesObject) => {
  invoicesObject.forEach((invoice) => {
    const { name, customernumber } = invoice.customer;
    const {
      id,
      transdate,
      duedate,
      invnumber,
      description,
      status,
      currency,
      amount,
      paid,
    } = invoice;
    try {
      InvoiceCollection.insert({
        id,
        transdate,
        duedate,
        invnumber,
        description,
        name,
        customernumber,
        status,
        currency,
        amount,
        paid,
      });
    } catch (err) {
      console.error(err.errmsg);
      console.error(
        `invoice ${invnumber} with date ${moment(transdate).format(
          "DD.MM.YYYY"
        )} of customer ${name} for ${currency} ${amount}`
      );
      console.error(" ");
    }
  });
};
