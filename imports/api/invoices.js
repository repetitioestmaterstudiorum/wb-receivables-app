import { Mongo } from "meteor/mongo";

export const InvoiceCollection = new Mongo.Collection("invoices");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("invoices", function tasksPublication() {
    return InvoiceCollection.find();
  });
}
