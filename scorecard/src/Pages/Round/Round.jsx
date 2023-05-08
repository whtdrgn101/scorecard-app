import React, { useState, useEffect, useContext } from 'react';
import Confirmation from '../../Components/confirmation';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';
import { selectBaseUrl } from '../../features/api/apiSlice';

export default function Round() {
    const {id} = useParams();
    const [round, setRound] = useState([]);
    const [roundTypes, setRoundTypes] = useState([]);
    const [bows, setBows] = useState([]);
    const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(false);
    var [roundDate, setRoundDate] = useState('')
    var [roundTypeId, setRoundTypeId] = useState(0);
    var [bowId, setBowId] = useState(0);
    const base_url = useSelector(selectBaseUrl);
    const user = useSelector(selectUser);
    const baseUserUrl = base_url + '/user/' + user.id;

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
        fetch(base_url + '/round-type')
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
            body: JSON.stringify({ id: round.id, user_id: user.id, round_type_id: roundTypeId, bow_id: bowId, round_date: roundDate + ' 12:00:00', created_date: round.created_date})
        };
        fetch(baseUserUrl + '/round/' + round.id, requestOptions)
            .then(response => response.json())
            .then(new_round => {
                navigate('/rounds/');
            });
        return false;
    }
    function delete_round() {
        setShowConfirmation(true);
    }
    function onCancelHandler() {
        setShowConfirmation(false);
    }

    function onConfirmHandler() {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(baseUserUrl + '/round/' + round.id, requestOptions)
            .then(response => response.json())
            .then(round_status => {
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
                <Button as={Col} variant="danger" type="button" onClick={delete_round}>
                    Delete Round
                </Button>
                <Button as={Col} variant="primary" type="button" onClick={save_round}>
                    Save Changes
                </Button>  
            </Row>
            <Row>
                <Button as={Col} variant="secondary" type="button" onClick={() => navigate('/rounds')}>
                    Cancel
                </Button>
            </Row>
            <Confirmation message="Are you sure you want to delete this round?" 
                title="Delete Round Confirmation" show={showConfirmation} confirmButtonText="Delete Round?"
                onCancel={onCancelHandler} onConfirm={onConfirmHandler} />
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
