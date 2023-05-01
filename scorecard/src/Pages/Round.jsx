import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router";

export default function Round() {
    const {id} = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8008/user/1000/round/' + id)
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error(error));
      }, []);

    return (
        <Form>
            <Form.Group as={Col} className="mb-3" controlId="formGroupRoundDate">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" placeholder="Select a Date" />
            </Form.Group>
            <Row>
                <Form.Group as={Col} className="mb-3" controlId="formGroupRoundType">
                    <Form.Label>Round Type</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="formGroupBow">
                    <Form.Label>Bow</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}
