import React, { useState, useEffect, useContext } from 'react';
import UserConext from '../../Components/User/User';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function NewBow() {
    const session = useContext(UserConext);
    const [bowTypes, setBowTypes] = useState([]);
    const navigate = useNavigate();
    var [bowName, setBowName] = useState('')
    var [drawWeight, setBowDrawWeight] = useState(0)
    var [bowTypeId, setBowTypeId] = useState(0);
    const baseUserUrl = session.base_url + '/user/' + session.user.id;

    useEffect(() => {
        fetch(session.base_url + '/bow-type')
          .then(response => response.json())
          .then(bowTypes => setBowTypes(bowTypes))
          .catch(error => console.error(error));
      }, []);
    
    function save_bow(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: session.user.id, bow_type_id: bowTypeId, name: bowName, draw_weight: drawWeight, })
        };
        fetch(baseUserUrl + '/bow', requestOptions)
            .then(response => response.json())
            .then(new_bow => {
                if(new_bow.id) {
                    navigate('/bow/' + new_bow.id);
                }
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
                        <option>Open this select menu</option>
                        {bowTypes.map(btype => (
                            <option key={`${btype.id}`} value={`${btype.id}`}>{btype.name}</option>                       
                            )
                        )}
                    </Form.Select>
                </Form.Group>
            </Row>
            <Button variant="primary" type="button" onClick={save_bow}>
                Add New Bow
            </Button>
        </Form>
    );
}
