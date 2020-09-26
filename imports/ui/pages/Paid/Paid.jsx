import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { InvPaymentPairsCollection } from "../../../api/collections/invPaymentPairs";
import Pair from "./Pair";
import { Container } from "react-bootstrap";

const Paid = () => {
  // get pair data
  const invPaymentPairs = useTracker(() => {
    return InvPaymentPairsCollection.find(
      {},
      { sort: { createdAt: -1 }, limit: 10 }
    ).fetch();
  });

  // checked states
  const [checkedPairs, setCheckedPairs] = useState([]);
  const handlePairCheckbox = (pairId) => {
    checkedPairs.length === 0
      ? setCheckedPairs([...checkedPairs, pairId])
      : setCheckedPairs(
          checkedPairs.includes(pairId)
            ? checkedPairs.filter((element) => element !== pairId)
            : [...checkedPairs, pairId]
        );
  };

  // mark not paired
  const handleUnpair = () => {
    if (checkedPairs.length === 0) {
      alert("Selecte pair(s) to unpair");
    } else {
      checkedPairs.forEach((pairId) => {
        Meteor.call("removePair", pairId);
        const pair = invPaymentPairs.find((pair) => pair._id === pairId);
        Meteor.call("invoiceIsNotPaired", pair.invoiceId);
        Meteor.call("paymentIsNotPaired", pair.paymentId);
      });
      setCheckedPairs([]);
    }
  };

  return (
    <Container>
      <button
        className="btn btn-outline-info btn-sm mb-2"
        onClick={handleUnpair}>
        Unpair
      </button>
      <h2>Showing the last 10 payments:</h2>
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
