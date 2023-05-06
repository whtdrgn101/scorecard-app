import React, { useContext } from 'react';
import UserConext from './User/User';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Menu() {
  const session = useContext(UserConext);
  function Profile() {
    return <Nav className="gap-2"><Nav.Link className="text-decoration-none text-white" href="/profile">Profile</Nav.Link></Nav>;
  }
  function Login() {
    return <Nav className="gap-2"><Nav.Link className="btn btn-primary" href="#">Login</Nav.Link><Nav.Link eventKey={2} className="btn btn-light text-black" href="#">Sign up</Nav.Link></Nav>;
  }

  return (
    <Navbar collapseOnSelect expand="lg" fixed='top' bg="dark" variant="dark" className="p-3">
      <Container>
        <Navbar.Brand href="#home">Scorecard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="text-decoration-none text-white" href="/">Home</Nav.Link>
            <Nav.Link className="text-decoration-none text-white" href="/bows">Bows</Nav.Link>
            <Nav.Link className="text-decoration-none text-white" href="/rounds">Rounds</Nav.Link>
          </Nav>
          {session.user.id ? <Profile />:<Login />}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}