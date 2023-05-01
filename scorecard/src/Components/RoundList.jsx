
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

function RoundList() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8008/user/1000/round')
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
            <h3>Most Recent Rounds for User</h3>
            <Table striped bordered hover responsive>
                <caption>Most Recent Rounds for User</caption>
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