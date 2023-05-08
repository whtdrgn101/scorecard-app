import React, { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import { selectUser } from '../reducers/user/userSlice';

export default function Home() {
  const user = useSelector(selectUser);
  return (
    <Container>
      <h1>Welcome {user && user.name}</h1>
    </Container>
  );
}
