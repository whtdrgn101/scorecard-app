import React, { useState, useEffect, useContext } from 'react';
import UserConext from '../Components/User/User';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router";

export default function Round() {
    const {id} = useParams();
    const user = useContext(UserConext);
    const [round, setRound] = useState([]);
    const [roundTypes, setRoundTypes] = useState([]);
    const [bows, setBows] = useState([]);
    var [roundDate, setRoundDate] = useState('')
    var [roundTypeId, setRoundTypeId] = useState(0);
    var [bowId, setBowId] = useState(0);
    const baseURL = 'http://localhost:8008';
    const baseUserUrl = baseURL + '/user/' + user.id
    useEffect(() => {
        fetch( baseUserUrl + '/round/' + id)
            .then(response => response.json())
            .then(round => { 
                if(round.id) {
                    setRound(round);
                    setRoundDate(formatDate(new Date(round.round_date)));
                    setRoundTypeId(round.round_type_id);
                    setBowId(round.bow_id);
                } 
            })
            .catch(error => console.error(error));
        fetch(baseURL + '/round-type')
          .then(response => response.json())
          .then(roundTypes => setRoundTypes(roundTypes))
          .catch(error => console.error(error));
        fetch(baseUserUrl + '/bow')
          .then(response => response.json())
          .then(bows => setBows(bows))
          .catch(error => console.error(error));
      }, []);
    
    return (
        <Form>
            <Row>
                <Form.Group as={Col} className="mb-3" controlId="formGroupRoundDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" placeholder="Select a Date" value={roundDate} onChange={e => setRoundDate(e.target.value)}/>
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="formGroupRoundType">
                    <Form.Label>Round Type</Form.Label>
                    <Form.Select onChange={e => setRoundTypeId(e.target.value)} value={roundTypeId}>
                        <option>Open this select menu</option>
                        {roundTypes.map(rtype => (
                            <option key={`${rtype.id}`} value={`${rtype.id}`}>{rtype.name}</option>                       
                        )
                        )}
                    </Form.Select>
                </Form.Group>
            </Row>
            <Form.Group as={Col} className="mb-3" controlId="formGroupBow">
                <Form.Label>Bow</Form.Label>
                <Form.Select onChange={e => setBowId(e.target.value)} value={bowId}>
                    <option>Open this select menu</option>
                    {bows.map(bow => (
                        <option key={`${bow.id}`} value={`${bow.id}`}>{bow.name}</option>                       
                    )
                    )}
                </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );

    function formatDate(dt) {
        var getYear = dt.toLocaleDateString("default", { year: "numeric" });
        var getMonth = dt.toLocaleDateString("default", { month: "2-digit" });
        var getDay = dt.toLocaleDateString("default", { day: "2-digit" });
        var dateFormat = getYear + "-" + getMonth + "-" + getDay;
        return dateFormat;
    }
}
