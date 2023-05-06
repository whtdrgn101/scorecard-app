import React, { useState, useEffect , useContext} from 'react';
import Container from 'react-bootstrap/Container';
import UserConext from '../../Components/User/User';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';

function BowList({ navigation }) {
    const session = useContext(UserConext);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(session.base_url + '/user/' + session.user.id + '/bow')
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error(error));
      }, []);

    var bows = data.map(bow => {
        var created_date = new Date(bow.created_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });
        var updated_date = new Date(bow.updated_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
            });
        return {
            id: bow.id,
            name: bow.name,
            draw_weight: bow.draw_weight,
            bow_type: bow.bow_type.name,
            created_date: created_date,
            updated_date: updated_date
        }
      })
    return (
        <Container>
            <h3>Bows owned by {session.user.name}</h3>
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
                {bows.map(bow => (
                    <tr key={bow.id}>
                        <td><Link to={`/bow/${bow.id}`}>{bow.name}</Link></td>
                        <td>{bow.bow_type}</td>
                        <td>{bow.draw_weight}lbs</td>
                        <td>{bow.created_date}</td>
                        <td>{bow.updated_date}</td>
                    </tr>                        
                )
                )}
                </tbody>
            </Table>
        </Container>
    );
}

export default BowList;