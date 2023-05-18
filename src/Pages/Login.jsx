import React, { useState, useContext } from 'react';
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectBaseUrl } from '../reducers/apiSlice';
import { updateUser } from '../reducers/userSlice';

export default function Login() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    //Component state
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    
    //Redux state
    const base_url = useSelector(selectBaseUrl);
    const authURL = base_url + '/auth';
    
    function login() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        };
        fetch(authURL, requestOptions)
            .then(response => response.json())
            .then(user => {
                if(user.user_id) {
                    user = {id:user.user_id, name:user.name, email:user.email, last_login_date:user.last_login_date}
                    dispatch(updateUser(user));
                    navigate("/")
                }
            });
        return false;
    }
    return (
        <Form>
            <Row>
                <Form.Group  className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)}/>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group  className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
            </Row>
            <Row>
                <Button variant="primary" type="button" onClick={login}>
                    Login
                </Button>
            </Row>
        </Form>
    );
}
