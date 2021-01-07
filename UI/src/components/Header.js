import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { withRouter } from 'react-router-dom';


const Header = (props) => {
  
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Form Classification</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav >
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/contributors">Contributors</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(Header);
