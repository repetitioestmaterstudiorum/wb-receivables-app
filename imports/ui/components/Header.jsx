import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Container>
      <Navbar
        collapseOnSelect
        expand="sm"
        bg="dark"
        variant="dark"
        className="mb-3"
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Link to="/">
          <img src="logo.png" alt="wB" style={{ maxWidth: "40px" }} />
        </Link>
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="mt-2 mt-sm-0 ml-0 ml-sm-1"
        >
          <Nav className="mr-auto">
            <Link to="/splitview" className="nav-link">
              Splitview
            </Link>
            <Link to="/todays" className="nav-link">
              Todays
            </Link>
            <Link to="/consolidated" className="nav-link">
              Consolidated
            </Link>
          </Nav>
        </Navbar.Collapse>
        <Nav>
          <a href="#" className="nav-link">
            Log out
          </a>
        </Nav>
      </Navbar>
    </Container>
  );
};

export default Header;
