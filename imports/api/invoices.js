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
  markInvoiceDeleted(invoiceId) {
    check(invoiceId, String);
    InvoicesCollection.update(
      { _id: invoiceId },
      { $set: { isDeleted: true } }
    );
  },
  markInvoiceNotDeleted(invoiceId) {
    check(invoiceId, String);
    InvoicesCollection.update(
      { _id: invoiceId },
      { $set: { isDeleted: false } }
    );
  },
  invoiceIsPaired(invoiceId) {
    check(invoiceId, String);
    InvoicesCollection.update({ _id: invoiceId }, { $set: { isPaired: true } });
  },
  invoiceIsNotPaired(invoiceId) {
    check(invoiceId, String);
    InvoicesCollection.update(
      { _id: invoiceId },
      { $set: { isPaired: false } }
    );
  },
});
