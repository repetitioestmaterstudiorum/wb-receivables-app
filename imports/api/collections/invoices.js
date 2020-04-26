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
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    check(invoiceId, String);
    InvoicesCollection.update(
      { _id: invoiceId },
      { $set: { isDeleted: true } }
    );
  },
  markInvoiceNotDeleted(invoiceId) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    check(invoiceId, String);
    InvoicesCollection.update(
      { _id: invoiceId },
      { $set: { isDeleted: false } }
    );
  },
  invoiceIsPaired(invoiceId) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    check(invoiceId, String);
    InvoicesCollection.update({ _id: invoiceId }, { $set: { isPaired: true } });
  },
  invoiceIsNotPaired(invoiceId) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    check(invoiceId, String);
    InvoicesCollection.update(
      { _id: invoiceId },
      { $set: { isPaired: false } }
    );
  },
  fetchInvoices() {
    if (Meteor.isClient) {
      if (!this.userId) {
        throw new Meteor.Error("not-authorized");
      }
    }
    if (Meteor.isServer) {
      fetchAndUpsertInvoices();
    }
  },
  updateInvoicesFetchLog() {
    if (Meteor.isClient) {
      if (!this.userId) {
        throw new Meteor.Error("not-authorized");
      }
    }
    if (Meteor.isServer) {
      InvoicesFetchLog.insert({
        createdAt: now(),
      });
    }
  },
});
