import { Mongo } from "meteor/mongo";

export const PaymentsCollection = new Mongo.Collection("payments");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("payments", function () {
    return PaymentsCollection.find();
  });
}
