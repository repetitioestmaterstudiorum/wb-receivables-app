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
  removePair(pairId) {
    check(pairId, String);
    InvPaymentPairsCollection.remove({ _id: pairId });
  },
});
