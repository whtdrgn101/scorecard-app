import React, { useState, useEffect, useContext } from 'react';
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectBaseUrl } from '../reducers/apiSlice';
import { updateUser } from '../reducers/userSlice';

export default function Registration() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
        
    //Component state
    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    
    //Redux state
    const base_url = useSelector(selectBaseUrl);
    const userURL = base_url + '/user';

    function register() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, email: email, password: password })
        };
        fetch(userURL, requestOptions)
            .then(response => response.json())
            .then(user => {
                if(user.id) {
                    user = {id:user.id, name:user.name, email:user.email, last_login_date:user.last_login_date}
                    dispatch(updateUser(user));
                    navigate("/")
                }
            });
        return false;
    }

    return (
        <Form>
            <Row>
                <Form.Group  className="mb-3" controlId="formGroupFullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)}/>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group  className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Provide your email address" value={email} onChange={e => setEmail(e.target.value)}/>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group  className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Set a password" value={password} onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
            </Row>
            <Row>
                <Button variant="primary" type="button" onClick={register}>
                    Register
                </Button>
            </Row>
        </Form>
    );
}
