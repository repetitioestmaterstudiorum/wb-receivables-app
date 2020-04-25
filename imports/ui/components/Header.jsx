import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
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
        <a href="/">
          <img src="logo.png" alt="wB" style={{ maxWidth: "40px" }} />
        </a>
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="mt-2 mt-sm-0 ml-0 ml-sm-1"
        >
          <Nav className="mr-auto">
            <Link to="/open">
              <Nav.Link href="#Open" as="span">
                Open
              </Nav.Link>
            </Link>
            <Link to="/paid">
              <Nav.Link href="#Paid" as="span">
                Paid
              </Nav.Link>
            </Link>
            <Link to="/deleted">
              <Nav.Link href="#Deleted" as="span">
                Deleted
              </Nav.Link>
            </Link>
            <Link to="/outgoing">
              <Nav.Link href="#Outgoing" as="span">
                (Outgoing Payments)
              </Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
        <Nav.Link href="/" style={{ color: "#ffffff80" }}>
          Logout
        </Nav.Link>
      </Navbar>
    </Container>
  );
};

export default Header;
