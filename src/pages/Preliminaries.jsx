import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

function Preliminaries() {
    const navigate = useNavigate();

    const [selectedView, setSelectedView] = useState('matches');

    return (
        <div>
            <Card className='text-center mb-3'>
                <Card.Header as='h1' className='display-5 fw-bold'>Preliminary Rounds</Card.Header>
            </Card>

            <div className='px-4 mb-3'>
                <div className='row g-2'>
                    <div className='col-6'>
                        <Button className='w-100' active={selectedView === 'matches'} onClick={() => setSelectedView('matches')}>Matches</Button>
                    </div>

                    <div className='col-6'>
                        <Button className='w-100' active={selectedView === 'results'} onClick={() => setSelectedView('results')}>Results</Button>
                    </div>
                </div>
            </div>

            <div className='px-4'>
                {selectedView === 'matches' && (
                    <p>Preliminary matches table will go here.</p>
                )}

                {selectedView === 'results' && (
                    <p>Preliminary results table will go here.</p>
                )}
            </div>

            <div className='d-grid gap-3 px-4'>
                <Button variant='danger' onClick={() => navigate('/')}>Logout</Button>
            </div>

        </div>
    )
}

export default Preliminaries; 