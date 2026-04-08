import { useNavigate } from 'react-router-dom'; 
import { Button, Card } from 'react-bootstrap'; 

function Home(){ 
    const navigate = useNavigate(); 

    return <div>
        <Card className='text-center mb-3'>
            <Card.Header as='h1' className='display-5 fw-bold'>IAMOOT 2026 - Select Competition</Card.Header>
        </Card>

        <div className='d-grid gap-3 px-4'>
            <Button onClick={() => navigate('/oral')}>Oral Competition</Button>
            <Button onClick={() => navigate('/written')}>Written Competition</Button>
            <Button variant='danger' onClick={() => navigate('/')}>Logout</Button>
        </div>
    </div>
}

export default Home; 