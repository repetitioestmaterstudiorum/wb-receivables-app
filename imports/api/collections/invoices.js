import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

import { fetchAndUpsertInvoices } from "../fetchAndUpsertInvoices";
import { now } from "../now";

export const InvoicesCollection = new Mongo.Collection("invoices");
export const InvoicesFetchLog = new Mongo.Collection("invoicesfetchlog");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("invoices", function () {
    return InvoicesCollection.find();
  });
  Meteor.publish("invoicesfetchlog", function () {
    return InvoicesFetchLog.find();
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
  fetchInvoices() {
    if (Meteor.isServer) {
      fetchAndUpsertInvoices();
    }
  },
  updateInvoicesFetchLog() {
    if (Meteor.isServer) {
      InvoicesFetchLog.insert({
        createdAt: now(),
      });
    }
  },
});
