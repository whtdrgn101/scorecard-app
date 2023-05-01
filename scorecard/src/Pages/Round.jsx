import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useParams } from "react-router";

export default function Round() {
    const {id} = useParams()
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8008/user/1000/round/' + id)
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error(error));
      }, []);

    return (
        <Container>
            <div class="panel panel-primary">
                <div class="panel-heading">Round on {data.round_date}</div>
                <div class="panel-body">
                    <div>Round Score: {data.score_total}</div>
                </div>
            </div>
        </Container>
    );
}
