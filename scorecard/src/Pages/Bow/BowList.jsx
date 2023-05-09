import React, { useState, useEffect , useContext} from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectBowList, updateBowList, selectBowListIsStale, updateBowListStale } from '../../reducers/userSlice';
import { selectBaseUrl } from '../../reducers/apiSlice';

function BowList() {
    
    const navigate = useNavigate();
    const dispatcher = useDispatch();

    //Redux state
    const bowList = useSelector(selectBowList);
    const base_url = useSelector(selectBaseUrl);
    const user = useSelector(selectUser);
    const bowListIsStale = useSelector(selectBowListIsStale);

    useEffect(() => {
        
        if( bowListIsStale == true || bowList == null) {
            fetch(base_url + '/user/' + user.id + '/bow')
            .then(response => response.json())
            .then(bowList => {
                    dispatcher(updateBowList(bowList));
                    dispatcher(updateBowListStale(false));
                })
            .catch(error => console.error(error));
        }
    }, []);

    function formatDate(uglyDate){
        var dt = new Date(uglyDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });
        return dt;
    }

    return (
        <Container>
            <h3>Bows owned by {user.name}</h3>
            <Table striped bordered hover responsive>
                <caption><Button onClick={() => navigate('/new-bow')}>New Bow</Button></caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Draw Weight</th>
                        <th>Created</th>
                        <th>Updated</th>
                    </tr>
                </thead>
                <tbody>
                {bowList && bowList.map(bow => (
                    <tr key={bow.id}>
                        <td><Link to={`/bow/${bow.id}`}>{bow.name}</Link></td>
                        <td>{bow.bow_type.name}</td>
                        <td>{bow.draw_weight}lbs</td>
                        <td>{formatDate(bow.created_date)}</td>
                        <td>{formatDate(bow.updated_date)}</td>
                    </tr>                        
                )
                )}
                </tbody>
            </Table>
        </Container>
    );
}

export default BowList;