import React, { useState, useEffect } from 'react';
import Confirmation from '../../Components/confirmation';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BsPencil, BsTrash } from "react-icons/bs"
import { selectUser, selectRoundTypeList, updateRoundTypeList, selectBowList, updateBowList, selectBowListIsStale, updateBowListStale } from '../../reducers/userSlice';
import { selectBaseUrl } from '../../reducers/apiSlice';

export default function Round() {

    const { id } = useParams();
    const dispatcher = useDispatch();
    const navigate = useNavigate();
    
    //Local component states
    const [showRoundConfirmation, setShowRoundConfirmation] = useState(false);
    const [showEndConfirmation, setShowEndConfirmation] = useState(false);
    const [showEndEdit, setShowEndEdit] = useState(false);
    const [activeEnd, setActiveEnd] = useState(0);
    const [activeEndScore, setActiveEndScore] = useState(0);
    const [round, setRound] = useState([]);
    const [roundDate, setRoundDate] = useState('')
    const [roundTypeId, setRoundTypeId] = useState(0);
    const [bowId, setBowId] = useState(0);
    const [endEditTitle, setEndEditTitle] = useState("");

    //Redux states
    const bows = useSelector(selectBowList);
    const roundTypes = useSelector(selectRoundTypeList);
    const base_url = useSelector(selectBaseUrl);
    const user = useSelector(selectUser);
    const bowListIsStale = useSelector(selectBowListIsStale);
    const baseUserUrl = base_url + '/user/' + user.id;

    useEffect(() => {
        getRound();
        roundTypes || fetch(base_url + '/round-type')
            .then(response => response.json())
            .then(roundTypes => dispatcher(updateRoundTypeList(roundTypes)))
            .catch(error => console.error(error));

        if (bowListIsStale == true || bows == null) {
            fetch(baseUserUrl + '/bow')
                .then(response => response.json())
                .then(bows => {
                    dispatcher(updateBowList(bows));
                    dispatcher(updateBowListStale(false));
                })
                .catch(error => console.error(error));
        }
    }, []);

    function getRound() {
        fetch(baseUserUrl + '/round/' + id)
            .then(response => response.json())
            .then(round => {
                if (round.id) {
                    setRound(round);
                    setRoundDate(formatDate(new Date(round.round_date)));
                    setRoundTypeId(round.round_type_id);
                    setBowId(round.bow_id);
                }
            })
            .catch(error => console.error(error));
        return true;
    }

    function saveRound() {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: round.id, user_id: user.id, round_type_id: roundTypeId, bow_id: bowId, round_date: roundDate + ' 12:00:00', created_date: round.created_date })
        };
        fetch(baseUserUrl + '/round/' + round.id, requestOptions)
            .then(response => response.json())
            .then(new_round => {
                navigate('/rounds/');
            });
        return false;
    }
    
    function deleteRound() {
        setShowRoundConfirmation(true);
    }
    
    function onRoundCancelHandler() {
        setShowRoundConfirmation(false);
    }

    function onRoundConfirmHandler() {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(baseUserUrl + '/round/' + round.id, requestOptions)
            .then(response => response.json())
            .then(round_status => {
                setShowEndConfirmation(false);
            });
        return true;
    }

    /**
     * END DELETE
     */
    function deleteEnd(endId) {
        setActiveEnd(endId);
        setShowEndConfirmation(true);
    }

    function onEndCancelHandler() {
        setShowEndConfirmation(false);
    }

    function onEndConfirmHandler() {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(baseUserUrl + '/round/' + round.id + '/end/' + activeEnd, requestOptions)
            .then(response => response.json())
            .then(result => { return getRound(); })
            .then(result => { setShowEndConfirmation(false); });
        return true;
    }

    /**
     * END ADD/EDIT
     */
    function newEnd() {
        setActiveEnd(0);
        setActiveEndScore(0);
        setEndEditTitle("Adding New End");
        setShowEndEdit(true);
    }

    function editEnd(endId, score) {
        setActiveEnd(endId);
        setActiveEndScore(score);
        setEndEditTitle("Editting End");
        setShowEndEdit(true);
    }

    function onEndEditClose() {
        setShowEndEdit(false);
    }

    function onEndEditConfirm() {
        var end = { round_id: round.id, score: activeEndScore };
        var method = "POST";
        var url = baseUserUrl + '/round/' + round.id + '/end';
        
        if(activeEnd > 0) {
            end = { id: activeEnd, round_id: round.id, score: activeEndScore };
            method = "PUT";
            url = url + '/' + activeEnd;
        }

        const requestOptions = {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(end)
        };
        
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => { getRound(); })
            .then(new_round => { setShowEndEdit(false); });
        
        return true;
    }

    return (
        <Form>
            <Row>
                <Form.Group as={Col} className="mb-3" controlId="formGroupRoundDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" placeholder="Select a Date" value={roundDate} onChange={e => setRoundDate(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="formGroupRoundType">
                    <Form.Label>Round Type</Form.Label>
                    <Form.Select onChange={e => setRoundTypeId(e.target.value)} value={roundTypeId}>
                        <option>Open this select menu</option>
                        {roundTypes && roundTypes.map(rtype => (
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
                    {bows && bows.map(bow => (
                        <option key={`${bow.id}`} value={`${bow.id}`}>{bow.name}</option>
                    )
                    )}
                </Form.Select>
            </Form.Group>
            <Row>
                <Form.Label>Ends</Form.Label>
                <Table striped bordered hover responsive>
                    <caption><Button onClick={newEnd}>New End</Button></caption>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {round.ends && round.ends.map(end => (
                            <tr key={end.id}>
                                <td><Button onClick={() => editEnd(end.id, end.score)}><BsPencil /></Button>&nbsp;<Button onClick={() => deleteEnd(end.id)}><BsTrash /></Button></td>
                                <td>{end.score}</td>
                            </tr>
                        )
                        )}
                    </tbody>
                </Table>
            </Row>
            <Row>
                <Button as={Col} variant="danger" type="button" onClick={deleteRound}>
                    Delete Round
                </Button>
                <Button as={Col} variant="primary" type="button" onClick={saveRound}>
                    Save Changes
                </Button>
            </Row>
            <Row>
                <Button as={Col} variant="secondary" type="button" onClick={() => navigate('/rounds')}>
                    Cancel
                </Button>
            </Row>
            
            <Confirmation message="Are you sure you want to delete this round?"
                title="Delete Round Confirmation" show={showRoundConfirmation} confirmButtonText="Delete Round?"
                onCancel={onRoundCancelHandler} onConfirm={onRoundConfirmHandler} />
            
            <Confirmation message="Are you sure you want to delete this end?"
                title="Delete End Confirmation" show={showEndConfirmation} confirmButtonText="Delete End?"
                onCancel={onEndCancelHandler} onConfirm={onEndConfirmHandler} />
            
            <Modal show={showEndEdit} onHide={onEndEditClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{endEditTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Col} className="mb-3" controlId="formGroupEndScore">
                        <Form.Label>Score</Form.Label>
                        <Form.Control type="numeric" placeholder="Enter Score" value={activeEndScore} onChange={e => setActiveEndScore(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onEndEditClose}>Close</Button>
                    <Button variant="primary" onClick={onEndEditConfirm}>Save End</Button>
                </Modal.Footer>
            </Modal>
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
