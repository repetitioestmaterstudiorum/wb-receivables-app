import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

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
        <img src="logo.png" alt="wB" style={{ maxWidth: "40px" }} />
        {/* <a href="/">
          <img src="logo.png" alt="wB" style={{ maxWidth: "40px" }} />
        </a> */}
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="mt-2 mt-sm-0 ml-0 ml-sm-1"
        >
          <Nav className="mr-auto">
            <NavLink to="/open" exact activeClassName="active">
              <Nav.Link as="span">Open</Nav.Link>
            </NavLink>
            <NavLink to="/paid" exact activeClassName="active">
              <Nav.Link as="span">Paid</Nav.Link>
            </NavLink>
            <NavLink to="/deleted" exact activeClassName="active">
              <Nav.Link as="span">Deleted</Nav.Link>
            </NavLink>
            <NavLink to="/outgoing" exact activeClassName="active">
              <Nav.Link as="span">(Outgoing Payments)</Nav.Link>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
        <NavLink to="/">
          <Nav.Link as="span" style={{ color: "#ffffff80" }}>
            Logout
          </Nav.Link>
        </NavLink>
      </Navbar>
    </Container>
  );
};

export default Header;
