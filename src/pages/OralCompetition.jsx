import { useNavigate } from 'react-router-dom'; 
import { Button, Card } from 'react-bootstrap'; 

function OralCompetition() {
    const navigate = useNavigate(); 

    return (
        <div>
            <Card className='text-center mb-3'>
                <Card.Header as='h1' className='display-5 fw-bold'>Oral Competition</Card.Header>
            </Card>

            <div className='d-grid gap-3 px-4'>
                <Button onClick={() => navigate('/oral/preliminaries')}>Preliminaries</Button>
                <Button onClick={() => navigate('/oral/semifinals')}>Semifinals</Button>
                <Button onClick={() => navigate('/oral-competition/individual-awards')}>Individual Awards</Button>
                <Button variant='danger' onClick={() => navigate('/')}>Logout</Button>
            </div>
        </div>
    )
}

export default OralCompetition; 