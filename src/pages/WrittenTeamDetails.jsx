import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';

function WrittenTeamDetails() {

    const navigate = useNavigate();
    const { teamID } = useParams();

    const [isStatePenaltyFormVisible, setIsStatePenaltyFormVisible] = useState(false);
    const [statePenaltyInput, setStatePenaltyInput] = useState('');
    const [statePenaltyError, setStatePenaltyError] = useState('');
    const [savedStatePenalty, setSavedStatePenalty] = useState(null);

    const [isVictimPenaltyFormVisible, setIsVictimPenaltyFormVisible] = useState(false);
    const [victimPenaltyInput, setVictimPenaltyInput] = useState('');
    const [victimPenaltyError, setVictimPenaltyError] = useState('');
    const [savedVictimPenalty, setSavedVictimPenalty] = useState(null);

    const stateAverage = 89.67;
    const victimAverage = 90.33;

    const adjustedStateScore = savedStatePenalty === null ? stateAverage : stateAverage - savedStatePenalty;
    const adjustedVictimScore = savedVictimPenalty === null ? victimAverage : victimAverage - savedVictimPenalty;

    const handleSaveStatePenalty = () => {
        const penaltyValue = Number(statePenaltyInput);

        if (!statePenaltyInput.trim()) {
            setStatePenaltyError('Penalty amount is required');
            return;
        }

        if (Number.isNaN(penaltyValue) || penaltyValue <= 0) {
            setStatePenaltyError('Penalty amount must be a number greater than 0');
            return;
        }

        setSavedStatePenalty(penaltyValue);
        setStatePenaltyError('');
        setStatePenaltyInput('');
        setIsStatePenaltyFormVisible(false);
    }

    const handleSaveVictimPenalty = () => {
        const penaltyValue = Number(victimPenaltyInput);

        if (!victimPenaltyInput.trim()) {
            setVictimPenaltyError('Penalty amount is required');
            return;
        }

        if (Number.isNaN(penaltyValue) || penaltyValue <= 0) {
            setVictimPenaltyError('Penalty amount must be a number greater than 0');
            return;
        }

        setSavedVictimPenalty(penaltyValue);
        setVictimPenaltyError('');
        setVictimPenaltyInput('');
        setIsVictimPenaltyFormVisible(false);
    }

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
                        <p><strong>Average:</strong> {stateAverage}</p>
                        <p><strong>Penalty:</strong> {savedStatePenalty === null ? 'None' : `-${savedStatePenalty}`}</p>
                        <p><strong>Adjusted Score:</strong> {adjustedStateScore}</p>

                        {savedStatePenalty === null && !isStatePenaltyFormVisible && (
                            <Button onClick={() => setIsStatePenaltyFormVisible(true)}> Add Penalty</Button>
                        )}

                        {isStatePenaltyFormVisible && (
                            <Form className='mt-3'>
                                <Form.Group className='mb-3'>
                                    <Form.Label className='fw-bold'>Penalty Amount</Form.Label>
                                    <Form.Control type='number' min='0' value={statePenaltyInput} onChange={(event) => setStatePenaltyInput(event.target.value)} />
                                    {statePenaltyError && (
                                        <div className='text-danger mt-2'>{statePenaltyError}</div>
                                    )}
                                </Form.Group>

                                <div className='d-flex gap-2'>
                                    <Button onClick={handleSaveStatePenalty}>Save Penalty</Button>
                                    <Button variant='danger' onClick={() => { setIsStatePenaltyFormVisible(false); setStatePenaltyInput(''); setStatePenaltyError(''); }}>Cancel</Button>
                                </div>
                            </Form>
                        )}

                    </Card.Body>
                </Card>

                <Card className='mb-3'>
                    <Card.Header as='h2' className='fw-bold'>Victim Memorandum Details</Card.Header>
                    <Card.Body>
                        <p><strong>Scores:</strong> 92, 89, 90</p>
                        <p><strong>Average:</strong> {victimAverage}</p>
                        <p><strong>Penalty:</strong> {savedVictimPenalty === null ? 'None' : `-${savedVictimPenalty}`}</p>
                        <p><strong>Adjusted Score:</strong> {adjustedVictimScore}</p>

                        {savedVictimPenalty === null && !isVictimPenaltyFormVisible && (
                            <Button onClick={() => setIsVictimPenaltyFormVisible(true)}> Add Penalty</Button>
                        )}

                        {isVictimPenaltyFormVisible && (
                            <Form className='mt-3'>
                                <Form.Group className='mb-3'>
                                    <Form.Label className='fw-bold'>Penalty Amount</Form.Label>
                                    <Form.Control type='number' min='0' value={victimPenaltyInput} onChange={(event) => setVictimPenaltyInput(event.target.value)} />
                                    {victimPenaltyError && (
                                        <div className='text-danger mt-2'>{victimPenaltyError}</div>
                                    )}
                                </Form.Group>

                                <div className='d-flex gap-2'>
                                    <Button onClick={handleSaveVictimPenalty}>Save Penalty</Button>
                                    <Button variant='danger' onClick={() => {setIsVictimPenaltyFormVisible(false); setVictimPenaltyInput(''); setVictimPenaltyError('')}}>Cancel</Button>
                                </div>
                            </Form>
                        )}

                    </Card.Body>
                </Card>
            </div>

            <div className='d-grid gap-3 px-4'>
                <Button onClick={() => navigate('/written')}>Return to Results</Button>
                <Button variant='danger' onClick={() => navigate('/')}>Logout</Button>
            </div>
        </div>
    )

}

export default WrittenTeamDetails; 