import { Meteor } from "meteor/meteor";
import bodyParser from "body-parser";
import moment from "moment-timezone";
import { LinksCollection } from "/imports/api/links";
import { Invoices } from "/imports/api/invoices";
import { fetchInvoices } from "/imports/server/fetchInvoices";

import dotenv from "dotenv";
dotenv.config({
  path: Assets.absoluteFilePath(".env"),
});

const insertLink = ({ title, url }) => {
  LinksCollection.insert({ title, url, createdAt: new Date() });
};

// current date (taking the time zone into account)
const todaysDate = moment().tz(process.env.TIME_ZONE).format("DD.MM.YYYY");
console.log("todaysDate", todaysDate);

const insertInvoices = () => {
  // Invoices.insert({});
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
  // console.log("fetchInvoices()", fetchInvoices());
  // fetchInvoices().then((result) => console.log(result.data));
  // If the Links collection is empty, add some data.
  if (LinksCollection.find().count() === 0) {
    insertLink({
      title: "Do the Tutorial",
      url: "https://www.meteor.com/tutorials/react/creating-an-app",
    });

    insertLink({
      title: "Follow the Guide",
      url: "http://guide.meteor.com",
    });

    insertLink({
      title: "Read the Docs",
      url: "https://docs.meteor.com",
    });

    insertLink({
      title: "Discussions",
      url: "https://forums.meteor.com",
    });
  }
});
