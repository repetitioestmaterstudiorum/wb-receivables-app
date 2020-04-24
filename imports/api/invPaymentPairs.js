import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const InvPaymentPairsCollection = new Mongo.Collection(
  "invpaymentpairs"
);

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("invpaymentpairs", function () {
    return InvPaymentPairsCollection.find();
  });
}

Meteor.methods({
  addPair(object) {
    check(object, Object);
    InvPaymentPairsCollection.insert(object);
  },
});

// Meteor.methods({
//   markInvoiceDeleted(invoiceId) {
//     check(invoiceId, String);
//     InvoicesCollection.update(
//       { _id: invoiceId },
//       { $set: { isDeleted: true } }
//     );
//   },
//   markInvoiceNotDeleted(invoiceId) {
//     check(invoiceId, String);
//     InvoicesCollection.update(
//       { _id: invoiceId },
//       { $set: { isDeleted: false } }
//     );
//   },
// });
