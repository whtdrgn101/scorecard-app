import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { useSelector, useDispatch } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { selectLoggedIn, logout } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Menu() {
  const logged_in = useSelector(selectLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
    navigate('/');
  }

  function Profile() {
    return (
      <Nav className="gap-2">
        <Button variant='danger' onClick={handleLogout}>Logout</Button>
        <Nav.Link className="text-decoration-none text-white" href="/profile">Profile</Nav.Link>
      </Nav>
    ) 
  }

  function Login() {
    return <Nav className="gap-2"><Nav.Link className="btn btn-primary" href="/login">Login</Nav.Link><Nav.Link eventKey={2} className="btn btn-light text-black" href="/registration">Sign up</Nav.Link></Nav>;
  }

  return (
    <Navbar collapseOnSelect expand="lg" fixed='top' bg="dark" variant="dark" className="p-3">
      <Container>
        <Navbar.Brand href="#home">Scorecard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="text-decoration-none text-white" href="/">Home</Nav.Link>
            {logged_in &&
            <>
              <Nav.Link className="text-decoration-none text-white" href="/bows">Bows</Nav.Link>
              <Nav.Link className="text-decoration-none text-white" href="/rounds">Rounds</Nav.Link>
            </>
            }
          </Nav>
          {(logged_in)? <Profile />:<Login />}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}