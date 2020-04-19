import { Meteor } from "meteor/meteor";
import bodyParser from "body-parser";
import { InvoiceCollection } from "/imports/api/invoices";
import {
  fetchInvoices,
  upsertInvoices,
} from "/imports/server/invoiceFunctions";
import dotenv from "dotenv";
dotenv.config({
  path: Assets.absoluteFilePath(".env"),
});

// For requests with content-type JSON:
WebApp.connectHandlers.use("/email", bodyParser.json());
// For requests with content-type application/x-www-form-urlencoded
WebApp.connectHandlers.use("/email", bodyParser.urlencoded({ extended: true }));
// Then your handler:
WebApp.connectHandlers.use("/email", (req, res) => {
  // API.handleRequest(res, req);
  console.log(req.body); // for now
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);
  res.end(JSON.stringify({ status: "ok", content: req.body }));
});

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

  // create index for the invid field in the collection "invoices" to ensure no duplicates (2nd layer, 1st is upsert based on invid)
  InvoiceCollection.rawCollection().createIndex({ invid: 1 }, { unique: true });
});
