
import React, { useState, useEffect , useContext} from 'react';
import Container from 'react-bootstrap/Container';
import UserConext from '../../Components/User/User';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';

function RoundList() {
    const session = useContext(UserConext);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(session.base_url + '/user/' + session.user.id + '/round')
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error(error));
      }, []);

    var rounds = data.map(round => {
        var dt = new Date(round.round_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });
        return {
            id: round.id,
            round_date: dt,
            score_total: round.score_total,
            round_type: round.round_type.name,
            bow_name: round.bow.name,
            bow_id: round.bow.id
        }
      })
    return (
        <Container>
            <h3>Most Recent Rounds for {session.user.name}</h3>
            <Table striped bordered hover responsive>
                <caption><Button onClick={() => navigate('/new-round')}>New Round</Button></caption>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Bow</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                {rounds.map(round => (
                    <tr key={round.id}>
                        <td><Link to={`/round/${round.id}`}>{round.round_date}</Link></td>
                        <td>{round.round_type}</td>
                        <td>{round.bow_name}</td>
                        <td>{round.score_total}</td>
                    </tr>                        
                )
                )}
                </tbody>
            </Table>
        </Container>
    );
}

export default RoundList;