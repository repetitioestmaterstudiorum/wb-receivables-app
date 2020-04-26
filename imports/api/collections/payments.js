import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const PaymentsCollection = new Mongo.Collection("payments");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("payments", function () {
    return PaymentsCollection.find();
  });
}

Meteor.methods({
  markPaymentDeleted(paymentId) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    check(paymentId, String);
    PaymentsCollection.update(
      { _id: paymentId },
      { $set: { isDeleted: true } }
    );
  },
  markPaymentNotDeleted(paymentId) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    check(paymentId, String);
    PaymentsCollection.update(
      { _id: paymentId },
      { $set: { isDeleted: false } }
    );
  },
  paymentIsPaired(paymentId) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    check(paymentId, String);
    PaymentsCollection.update({ _id: paymentId }, { $set: { isPaired: true } });
  },
  paymentIsNotPaired(paymentId) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    check(paymentId, String);
    PaymentsCollection.update(
      { _id: paymentId },
      { $set: { isPaired: false } }
    );
  },
});
