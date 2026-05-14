import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';

import api from '../services/api';

function WrittenTeamDetails() {

    const navigate = useNavigate();
    const { teamID } = useParams();

    const [teamDetails, setTeamDetails] = useState(null);
    const [isLoadingTeamDetails, setIsLoadingTeamDetails] = useState(true);
    const [teamDetailsError, setTeamDetailsError] = useState('');

    const [isStatePenaltyFormVisible, setIsStatePenaltyFormVisible] = useState(false);
    const [statePenaltyInput, setStatePenaltyInput] = useState('');
    const [statePenaltyError, setStatePenaltyError] = useState('');
    const [savedStatePenalty, setSavedStatePenalty] = useState(null);

    const [isVictimPenaltyFormVisible, setIsVictimPenaltyFormVisible] = useState(false);
    const [victimPenaltyInput, setVictimPenaltyInput] = useState('');
    const [victimPenaltyError, setVictimPenaltyError] = useState('');
    const [savedVictimPenalty, setSavedVictimPenalty] = useState(null);

    useEffect(() => {
        const getTeamDetails = async () => {
            try {
                const teamDetailsResponse = await api.get(`/api/admin/written/team/${teamID}`);
                setTeamDetails(teamDetailsResponse.data);
            } catch (error) {
                console.error('Written team details error: ', error);
                setTeamDetailsError('Unable to retrieve written team details.');
            } finally {
                setIsLoadingTeamDetails(false);
            }
        }

        getTeamDetails();
    }, [teamID]);

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

    const teamRecord = teamDetails?.team; 
    const stateMemorandum = teamDetails?.memoranda?.state; 
    const victimMemorandum = teamDetails?.memoranda?.victim; 

    return (
        <div>
            <Card className='text-center mb-3'>
                <Card.Header as='h1' className='display-5 fw-bold'>Team {teamRecord?.teamID}: Memorandum Details</Card.Header>
            </Card>

            {isLoadingTeamDetails && (
                <p className='text-center fw-semibold'>Loading team details...</p>
            )}

            {teamDetailsError && (
                <p className='text-center text-danger fw-semibold'>{teamDetailsError}</p>
            )}

            {!isLoadingTeamDetails && !teamDetailsError && teamDetails && (
                <div className='px-4'>
                    <Card className='mb-3'>
                        <Card.Header as='h2' className='fw-bold'>State Memorandum Details</Card.Header>
                        <Card.Body>
                            <p><strong>Scores:</strong> {stateMemorandum?.scoreValues?.length ? stateMemorandum.scoreValues.join(', ') : 'N/A'}</p>
                            <p><strong>Average:</strong> {stateMemorandum?.averageScore ?? 'N/A'}</p>
                            <p><strong>Penalty:</strong> {stateMemorandum?.penaltyPoints ? `-${stateMemorandum.penaltyPoints}` : 'None'}</p>
                            <p><strong>Adjusted Score:</strong> {stateMemorandum?.adjustedScore ?? 'N/A'}</p>

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
                            <p><strong>Scores:</strong> {victimMemorandum?.scoreValues?.length ? victimMemorandum.scoreValues.join(', ') : 'N/A'}</p>
                            <p><strong>Average:</strong> {victimMemorandum?.averageScore ?? 'N/A'}</p>
                            <p><strong>Penalty:</strong> {victimMemorandum?.penaltyPoints ? `-${victimMemorandum.penaltyPoints}` : 'None'}</p>
                            <p><strong>Adjusted Score:</strong> {victimMemorandum?.adjustedScore ?? 'N/A'}</p>

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
                                        <Button variant='danger' onClick={() => { setIsVictimPenaltyFormVisible(false); setVictimPenaltyInput(''); setVictimPenaltyError('') }}>Cancel</Button>
                                    </div>
                                </Form>
                            )}

                        </Card.Body>
                    </Card>
                </div>
            )}

            <div className='d-grid gap-3 px-4'>
                <Button onClick={() => navigate('/written')}>Return to Results</Button>
                <Button variant='danger' onClick={() => navigate('/')}>Logout</Button>
            </div>
        </div>
    )

}

export default WrittenTeamDetails; 