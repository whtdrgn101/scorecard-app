import React, { useState, useEffect, useContext } from 'react';
import Confirmation from '../../Components/confirmation';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectBowTypeList, updateBowTypeList, updateBowListStale } from '../../reducers/userSlice';
import { selectBaseUrl, } from '../../reducers/apiSlice';


export default function Bow() {
    
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatcher = useDispatch();
    
    //Component state
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [bow, setBow] = useState([]);
    var [bowName, setBowName] = useState('')
    var [drawWeight, setBowDrawWeight] = useState(0)
    var [bowTypeId, setBowTypeId] = useState(0);
    
    //Redux state
    const base_url = useSelector(selectBaseUrl);
    const user = useSelector(selectUser);
    const bowTypes = useSelector(selectBowTypeList);
    const baseUserUrl = base_url + '/user/' + user.id;

    useEffect(() => {
        fetch( baseUserUrl + '/bow/' + id)
            .then(response => response.json())
            .then(bow => { 
                if(bow.id) {
                    setBow(bow);
                    setBowName(bow.name);
                    setBowTypeId(bow.bow_type_id);
                    setBowDrawWeight(bow.draw_weight);
                } 
            })
            .catch(error => console.error(error));
        bowTypes || fetch(base_url + '/bow-type')
          .then(response => response.json())
          .then(bowTypes => dispatcher(updateBowTypeList(bowTypes)))
          .catch(error => console.error(error));
      }, []);
    
    function save_bow(){
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: bow.id, user_id: user.id, bow_type_id: bowTypeId, name: bowName, draw_weight: drawWeight, })
        };
        fetch(baseUserUrl + '/bow/' + bow.id, requestOptions)
            .then(response => response.json())
            .then(new_bow => {
                dispatcher(updateBowListStale(true));
                navigate('/bows/');
            });
        return false;
    }
    function delete_bow() {
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
        fetch(baseUserUrl + '/bow/' + bow.id, requestOptions)
            .then(response => response.json())
            .then(new_bow => {
                dispatcher(updateBowListStale(true));
                navigate('/bows/');
            });
        return false;
    }
    return (
        <Form>
            <Form.Group as={Col} className="mb-3" controlId="formGroupBowName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Give the bow a name" value={bowName} onChange={e => setBowName(e.target.value)}/>
            </Form.Group>
            <Row>
                <Form.Group as={Col} className="mb-3" controlId="formGroupDrawWeight">
                    <Form.Label>Draw Weight</Form.Label>
                    <Form.Control type="numeric" placeholder="Set Draw Weight" value={drawWeight} onChange={e => setBowDrawWeight(e.target.value)}/>
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="formGroupBowType">
                    <Form.Label>Bow Type</Form.Label>
                    <Form.Select onChange={e => setBowTypeId(e.target.value)} value={bowTypeId}>
                        <option>Select Type</option>
                        {bowTypes && bowTypes.map(btype => (
                            <option key={`${btype.id}`} value={`${btype.id}`}>{btype.name}</option>                       
                            )
                        )}
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row>
                <Button as={Col} variant="danger" type="button" onClick={delete_bow}>
                    Delete
                </Button>
                <Button as={Col} variant="primary" type="button" onClick={save_bow}>
                    Save Changes
                </Button>
            </Row>
            <Row>
                <Button as={Col} variant="secondary" type="button" onClick={() => navigate('/bows')}>
                    Cancel
                </Button>
            </Row>
            <Confirmation message="Are you sure you want to delete this bow?" 
                title="Delete Bow Confirmation" show={showConfirmation} confirmButtonText="Delete Bow?"
                onCancel={onCancelHandler} onConfirm={onConfirmHandler} />
        </Form>
    );
}
