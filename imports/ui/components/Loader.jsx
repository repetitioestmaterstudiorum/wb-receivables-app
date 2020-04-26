import React from "react";
import { Spinner, Col } from "react-bootstrap";

const Loader = () => {
  return (
    <Col>
      <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="warning" />
      </div>
    </Col>
  );
};

export default Loader;
