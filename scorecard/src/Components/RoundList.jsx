
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
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
            bow_name: round.bow.name,
            bow_id: round.bow.id
        }
      })
    return (
        <Container>
            <h2>Most Recent Rounds for User</h2>
            <div className="row">
                <div className="col-xs-6 col-md-4"><strong>Date</strong></div>
                <div className="col-xs-6 col-md-4"><strong>Bow</strong></div>
                <div className="col-xs-6 col-md-4"><strong>Score</strong></div>
            </div>
            {rounds.map(round => (
            <div className="row">
                <div className="col-xs-6 col-md-4"><Link to={`/round/${round.id}`}>{round.round_date}</Link></div>
                <div className="col-xs-6 col-md-4">{round.bow_name}</div>
                <div className="col-xs-6 col-md-4">{round.score_total}</div>
            </div>                        
            )
            )}
                
        </Container>
    );
}

export default RoundList;