import { Mongo } from "meteor/mongo";

export const InvoicesCollection = new Mongo.Collection("invoices");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("invoices", function () {
    return InvoicesCollection.find();
  });
}
