import React, { useState, useEffect, useContext } from 'react';
import UserConext from '../../Components/User/User';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';

export default function Round() {
    const {id} = useParams();
    const session = useContext(UserConext);
    const [round, setRound] = useState([]);
    const [roundTypes, setRoundTypes] = useState([]);
    const [bows, setBows] = useState([]);
    const navigate = useNavigate();
    var [roundDate, setRoundDate] = useState('')
    var [roundTypeId, setRoundTypeId] = useState(0);
    var [bowId, setBowId] = useState(0);
    const baseUserUrl = session.base_url + '/user/' + session.user.id;
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
        fetch(session.base_url + '/round-type')
          .then(response => response.json())
          .then(roundTypes => setRoundTypes(roundTypes))
          .catch(error => console.error(error));
        fetch(baseUserUrl + '/bow')
          .then(response => response.json())
          .then(bows => setBows(bows))
          .catch(error => console.error(error));
      }, []);
    
    function save_round() {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: round.id, user_id: session.user.id, round_type_id: roundTypeId, bow_id: bowId, round_date: roundDate + ' 12:00:00', created_date: round.created_date})
        };
        fetch(baseUserUrl + '/round/' + round.id, requestOptions)
            .then(response => response.json())
            .then(new_round => {
                navigate('/rounds/');
            });
        return false;
    }

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
            <Row>
                <Button as={Col} variant="secondary" type="button" onClick={() => navigate('/rounds')}>
                    Cancel
                </Button>
                <Button as={Col} variant="primary" type="button" onClick={save_round}>
                    Save Changes
                </Button>   
            </Row>
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
