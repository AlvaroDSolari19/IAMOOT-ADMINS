import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

function WrittenTeamDetails() {

    const navigate = useNavigate();
    const { teamID } = useParams();

    return (
        <div>
            <Card className='text-center mb-3'>
                <Card.Header as='h1' className='display-5 fw-bold'>Team {teamID} - Memorandum Details</Card.Header>
            </Card>

            <div className='px-4'>
                <Card className='mb-3'>
                    <Card.Header as='h2' className='fw-bold'>State Memorandum Details</Card.Header>
                    <Card.Body>
                        <p><strong>Scores:</strong> 90, 88, 91</p>
                        <p><strong>Average:</strong> 89.67</p>
                        <p><strong>Penalty:</strong> None</p>
                        <p><strong>Adjusted Score:</strong> 89.67</p>
                        <Button> Add Penalty</Button>
                    </Card.Body>
                </Card>

                <Card className='mb-3'>
                    <Card.Header as='h2' className='fw-bold'>Victim Memorandum Details</Card.Header>
                    <Card.Body>
                        <p><strong>Scores:</strong> 92, 89, 90</p>
                        <p><strong>Average:</strong> 90.33</p>
                        <p><strong>Penalty:</strong> None</p>
                        <p><strong>Adjusted Score:</strong> 90.33</p>
                        <Button> Add Penalty</Button>
                    </Card.Body>
                </Card>
            </div>

            <div className='d-grid gap-3 px-4'>
                <Button variant='danger' onClick={() => navigate('/')}>Logout</Button>
            </div>
        </div>
    )

}

export default WrittenTeamDetails; 