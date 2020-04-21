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
        className="mb-3"
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Nav.Link href="/">
          <img src="logo.png" alt="wB" style={{ maxWidth: "40px" }} />
        </Nav.Link>
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="mt-2 mt-sm-0 ml-0 ml-sm-1"
        >
          <Nav className="mr-auto">
            <Link to="/splitview" exact>
              <Nav.Link href="#Splitview" as="span">
                Splitview
              </Nav.Link>
            </Link>
            <Link to="/consolidated">
              <Nav.Link href="#Consolidated" as="span">
                Consolidated
              </Nav.Link>
            </Link>
            <Link to="/deleted">
              <Nav.Link href="#Deleted" as="span">
                Deleted
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
