import { Meteor } from "meteor/meteor";
import bodyParser from "body-parser";
import { InvoiceCollection } from "/imports/api/invoices";
import {
  fetchInvoices,
  insertInvoices,
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

async function fetchAndInsertInvoices() {
  const result = await fetchInvoices();
  try {
    insertInvoices(result.data.invoice);
  } catch (err) {
    console.error(err);
  }
}

Meteor.startup(() => {
  // fetch invoices and update the "invoices" collection
  fetchAndInsertInvoices();

  // create index for the id field in the collection "invoices"
  InvoiceCollection.rawCollection().createIndex({ id: 1 }, { unique: true });
});
