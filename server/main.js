import { Meteor } from "meteor/meteor";
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

const insertInvoices = () => {
  // Invoices.insert({});
};

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
