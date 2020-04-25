import { WebApp } from "meteor/webapp";
import bodyParser from "body-parser";
import { emailToFilteredObject } from "/imports/server/emailToFilteredObject";
const multer = require("multer");
const multerUpload = multer();
import { PaymentsCollection } from "/imports/api/collections/payments";
import { now } from "../api/now";

// handle inbound emails via post request
const insertPayment = (from, subject, emailObject) => {
  const {
    transactionDate,
    transactionCurrency,
    transaction,
    newBalance,
  } = emailObject;
  try {
    PaymentsCollection.insert({
      from,
      subject,
      transactionDate,
      transactionCurrency,
      transaction,
      createdAt: now(),
      newBalance,
    });
  } catch (err) {
    console.error(err);
  }
};

// For requests with content-type JSON:
export const parseEmail = () => {
  WebApp.connectHandlers.use("/email", bodyParser.json());
  // For requests with content-type application/x-www-form-urlencoded
  WebApp.connectHandlers.use(
    "/email",
    bodyParser.urlencoded({ extended: true })
  );
  // Use Multer (for multi-form requests) with WebApp but none because there won't be any files
  WebApp.connectHandlers.use("/email", multerUpload.none());
  // Then your handler:
  WebApp.connectHandlers.use("/email", (req, res) => {
    // logging the request body for test purposes
    const subject = req.body.subject;
    const isPayment =
      subject === "Zahlungseingang" || subject === "Belastung" ? true : false;
    if (isPayment) {
      const envelope = JSON.parse(req.body.envelope);
      const from = envelope.from;
      // string to json object using regex operations
      const emailText = `${req.body.text}`;
      const emailObject = emailToFilteredObject(emailText);
      // insert data in database
      insertPayment(from, subject, emailObject);
    }
    // response to sender
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(
      JSON.stringify({
        status: "ok",
      })
    );
  });
};
