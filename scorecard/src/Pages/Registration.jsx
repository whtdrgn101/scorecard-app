import React, { useState, useEffect, useContext } from 'react';
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
    const registerUrl = session.base_url + '/user/';
    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const navigate = useNavigate();

    function register() {

    }
    return (
        <Form>
            <Row>
                <Form.Group  className="mb-3" controlId="formGroupBowName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)}/>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group  className="mb-3" controlId="formGroupBowName">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Provide your email address" value={email} onChange={e => setEmail(e.target.value)}/>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group  className="mb-3" controlId="formGroupBowName">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Set a password" value={password} onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
            </Row>
            <Row>
                <Button variant="primary" type="button" onClick={register}>
                    Login
                </Button>
            </Row>
        </Form>
    );
}
