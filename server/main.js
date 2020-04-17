import { Meteor } from "meteor/meteor";
import bodyParser from "body-parser";
import moment from "moment-timezone";
import { InvoiceCollection } from "/imports/api/invoices";
import { fetchInvoices } from "/imports/server/fetchInvoices";

import dotenv from "dotenv";
dotenv.config({
  path: Assets.absoluteFilePath(".env"),
});

const insertInvoices = (invoicesObject) => {
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
  });
};

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

Meteor.startup(() => {
  // current date (taking the time zone into account)
  const todaysDate = moment().tz(process.env.TIME_ZONE).format("DD.MM.YYYY");
  console.log("todaysDate: ", todaysDate);

  // create index for the id field in the collection "invoices"
  InvoiceCollection.rawCollection().createIndex({ id: 1 }, { unique: true });

  // fetch invoices and update the "invoices" collection
  fetchInvoices().then((result) => insertInvoices(result.data.invoice));
});
