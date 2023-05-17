import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectRoundTypeList, updateRoundTypeList, selectBowList, updateBowList, updateBowListStale, selectBowListIsStale } from '../../reducers/userSlice';
import { selectBaseUrl } from '../../reducers/apiSlice';

export default function NewRound() {
    
    const navigate = useNavigate();
    const dispatcher = useDispatch();
    
    //Local component states
    var [roundDate, setRoundDate] = useState('')
    var [roundTypeId, setRoundTypeId] = useState(0);
    var [bowId, setBowId] = useState(0);
    
    //Redux states
    const bows = useSelector(selectBowList);
    const bowListIsStale = useSelector(selectBowListIsStale);
    const roundTypes = useSelector(selectRoundTypeList);
    const base_url = useSelector(selectBaseUrl);
    const user = useSelector(selectUser);
    const baseUserUrl = base_url + '/user/' + user.id;

    useEffect(() => {
        //Only fetch round types if we don't have them from the redux state
        roundTypes || fetch(base_url + '/round-type')
          .then(response => response.json())
          .then(roundTypes => dispatcher(updateRoundTypeList(roundTypes)))
          .catch(error => console.error(error));
        //Grab bows if the list is stale or we don't have them
        if( bowListIsStale == true || bows == null) {
            fetch(baseUserUrl + '/bow')
          .then(response => response.json())
          .then(bows => {
                dispatcher(updateBowList(bows));
                dispatcher(updateBowListStale(false));
            })
          .catch(error => console.error(error));
        } 
      }, []);

    function save_round() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: user.id, round_type_id: roundTypeId, bow_id: bowId, round_date: roundDate + ' 12:00:00', })
        };
        fetch(baseUserUrl + '/round', requestOptions)
            .then(response => response.json())
            .then(new_round => {
                if(new_round.id) {
                    navigate('/round/' + new_round.id);
                }
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
                        <option>Select Type</option>
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
                    <option>Select Bow</option>
                    {bows && bows.map(bow => (
                        <option key={`${bow.id}`} value={`${bow.id}`}>{bow.name}</option>                       
                    )
                    )}
                </Form.Select>
            </Form.Group>
            <Row>
                <Button as={Col} variant="secondary" type="button" onClick={() => navigate('/rounds')}>
                    Cancel
                </Button>
                <Button as={Col} variant="primary" type="button" onClick={save_round} >
                    Add New Round
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
