import { useParams, useNavigate } from 'react-router-dom'; 
import { Button, Card, Form } from 'react-bootstrap'; 

function PreliminaryMatchDetails() {

    const navigate = useNavigate(); 
    const { matchID } = useParams(); 

    return (
        <div>
            <Card className='text-center mb-3'>
                <Card.Header as='h1' className='display-5 fw-bold'>Match {matchID} Details</Card.Header>
            </Card>

            <div className='px-4'>
                <Card className='mb-3'>
                    <Card.Header as='h2' className='fw-bold'>Match Information</Card.Header>
                    <Card.Body>
                        <p><strong>State:</strong>Universidad de Buenos Aires (12)</p>
                        <p><strong>Victim:</strong>Harvard University (3)</p>
                        <p><strong>Day & Time:</strong>Monday at 10:30 AM</p>
                        <p><strong>Classroom:</strong>Room 101</p>
                    </Card.Body>
                </Card>

                <Card className='mb-3'>
                    <Card.Header as='h2' className='fw-bold'>Assigned Judges</Card.Header>
                    <Card.Body>
                        <p>Maria Lopez (ID: 1000)</p>
                        <p>Daniel Smith (ID: 1002)</p>
                        <p>Ana Pereira (ID: 1004)</p>
                    </Card.Body>
                </Card>

                <Card className='mb-3'>
                    <Card.Header as='h2' className='fw-bold'>Winner Selection</Card.Header>
                    <Card.Body>
                        <Form.Group className='mb-3'>
                            <Form.Label className='fw-bold'>Winning Team</Form.Label>
                            <Form.Select>
                                <option value=''>Select Winning Team</option>
                                <option value='12'>Universidad de Buenos Aires (12)</option>
                                <option value='3'>Harvard University (3)</option>
                            </Form.Select>
                        </Form.Group>

                        <Button>Save Winner</Button>
                    </Card.Body>
                </Card>
            </div>

            <div className='d-grid gap-3 px-4'>
                <Button onClick={() => navigate('/oral/preliminaries')}>Return to Preliminaries</Button>
                <Button variant='danger' onClick={() => navigate('/')}>Logout</Button>
            </div>

        </div>
    )

}

export default PreliminaryMatchDetails; 