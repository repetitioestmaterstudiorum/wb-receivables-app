import { Meteor } from "meteor/meteor";
import { InvoicesCollection } from "../imports/api/invoices";
import {
  fetchInvoices,
  upsertInvoices,
} from "../imports/server/invoiceFunctions";
import { webApp } from "../imports/server/webApp";
import "../imports/api/invPaymentPairs";

// fetch invoice data
async function fetchAndUpsertInvoices() {
  const result = await fetchInvoices();
  try {
    upsertInvoices(result.data.invoice);
  } catch (err) {
    console.error(err);
  }
}

Meteor.startup(() => {
  // fetch invoices and update the "invoices" collection
  fetchAndUpsertInvoices();

  // listen to incoming emails
  webApp();

  // create index for the invid field in the collection "invoices" to ensure no duplicates (2nd layer, 1st is upsert based on invid)
  InvoicesCollection.rawCollection().createIndex(
    { invid: 1 },
    { unique: true }
  );
});
