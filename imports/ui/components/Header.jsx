import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="mt-2 mt-sm-0">
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
  );
};

export default Header;
