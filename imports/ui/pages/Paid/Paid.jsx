import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { InvPaymentPairsCollection } from "../../../api/invPaymentPairs";
import Pair from "./Pair";
import { Container } from "react-bootstrap";

const Paid = () => {
  // get pair data
  Meteor.subscribe("invpaymentpairs");
  const invPaymentPairs = useTracker(() => {
    return InvPaymentPairsCollection.find(
      {},
      { sort: { createdAt: -1 } }
    ).fetch();
  });

  // checked states
  const [checkedPairs, setCheckedPairs] = useState([]);
  const handlePairCheckbox = (paidId) => {
    checkedPairs.length === 0
      ? setCheckedPairs([...checkedPairs, paidId])
      : setCheckedPairs(
          checkedPairs.includes(paidId)
            ? checkedPairs.filter((element) => element !== paidId)
            : [...checkedPairs, paidId]
        );
    console.log("checkedPairs", checkedPairs);
  };

  // mark not paired
  const handleUnpair = () => {
    console.log("handleUnpair");
    // Meteor.call(paymentIsNotPaired, paymentId)
    // Meteor.call(invoiceIsNotPaired, invoiceId);
    // Meteor.call(removePair, pairId)
  };

  return (
    <Container>
      <button
        className="btn btn-outline-info btn-sm mb-2"
        onClick={handleUnpair}
      >
        Unpair
      </button>
      {invPaymentPairs.length === 0 ? (
        <p>No payment pairs..</p>
      ) : (
        <ul>
          {invPaymentPairs &&
            invPaymentPairs.map((pair) => (
              <Pair
                pair={pair}
                key={pair._id}
                handlePairCheckbox={handlePairCheckbox}
              />
            ))}
        </ul>
      )}
    </Container>
  );
};

export default Paid;
