import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { InvPaymentPairsCollection } from "../../../api/invPaymentPairs";
import { Container } from "react-bootstrap";

const Consolidated = () => {
  Meteor.subscribe("invpaymentpairs");
  const invPaymentPairs = useTracker(() => {
    return InvPaymentPairsCollection.find(
      {},
      { sort: { createdAt: -1 } }
    ).fetch();
  });

  console.log("invPaymentPairs", invPaymentPairs);

  return (
    <Container>
      <h1>Consolidated invoice-payment pairs:</h1>
      {invPaymentPairs.map((element) => (
        <p key={element._id}>{element._id}</p>
      ))}
    </Container>
  );
};

export default Consolidated;
