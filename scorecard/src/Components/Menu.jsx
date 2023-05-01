import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Menu() {
  return (
    <Navbar collapseOnSelect expand="lg" fixed='top' bg="dark" variant="dark" className="p-3">
      <Container>
        <Navbar.Brand href="#home">Scorecard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="text-decoration-none text-white" href="/">Home</Nav.Link>
            <Nav.Link className="text-decoration-none text-white" href="/profile">Profile</Nav.Link>
          </Nav>
          <Nav className="gap-2">
            <Nav.Link className="btn btn-primary" href="#">Login</Nav.Link>
            <Nav.Link eventKey={2} className="btn btn-light text-black" href="#">
              Sign up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}