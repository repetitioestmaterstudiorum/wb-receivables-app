import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const InvoicesCollection = new Mongo.Collection("invoices");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("invoices", function () {
    return InvoicesCollection.find();
  });
}

Meteor.methods({
  markDeleted(invoiceId) {
    check(invoiceId, String);
    InvoicesCollection.update(
      { _id: invoiceId },
      { $set: { isDeleted: true } }
    );
  },
  markNotDeleted(invoiceId) {
    check(invoiceId, String);
    InvoicesCollection.update(
      { _id: invoiceId },
      { $set: { isDeleted: false } }
    );
  },
});
