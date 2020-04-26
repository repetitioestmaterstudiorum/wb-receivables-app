import React from "react";
import { Container, Navbar } from "react-bootstrap";

const HeaderLoggedOut = () => {
  return (
    <Container className="header">
      <Navbar
        collapseOnSelect
        expand="sm"
        bg="dark"
        variant="dark"
        className="mb-2"
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <img src="logo.png" alt="wB" style={{ maxWidth: "40px" }} />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="mt-2 mt-sm-0 ml-0 ml-sm-1"
        ></Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default HeaderLoggedOut;
