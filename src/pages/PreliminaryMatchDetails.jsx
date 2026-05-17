import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';

import api from '../services/api';

function PreliminaryMatchDetails() {

    const navigate = useNavigate();
    const { matchID } = useParams();

    const [matchDetails, setMatchDetails] = useState(null);
    const [isLoadingMatchDetails, setIsLoadingMatchDetails] = useState(true);
    const [matchDetailsError, setMatchDetailsError] = useState('');

    const [selectedWinningTeam, setSelectedWinningTeam] = useState('');
    const [isSavingWinner, setIsSavingWinner] = useState(false);
    const [winnerUpdateMessage, setWinnerUpdateMessage] = useState(''); 
    const [winnerUpdateError, setWinnerUpdateError] = useState('');

    useEffect(() => {
        const getMatchDetails = async () => {
            try {
                const matchDetailsResponse = await api.get(`/api/admin/oral/preliminary-match/${matchID}`);
                const retrievedMatch = matchDetailsResponse.data.match;
                setMatchDetails(retrievedMatch);
                setSelectedWinningTeam(retrievedMatch.winningTeam || '');
            } catch (error) {
                console.error('Preliminary match details error: ', error);
                setMatchDetailsError('Failed to load preliminary match details.');
            } finally {
                setIsLoadingMatchDetails(false);
            }
        }

        getMatchDetails();
    }, [matchID]);

    const handleSaveWinner = async () => {

        try {
            setIsSavingWinner(true);
            setWinnerUpdateMessage(''); 
            setWinnerUpdateError('');

            await api.patch(`/api/admin/oral/preliminary-match/${matchID}/winner`, {
                winningTeam: selectedWinningTeam
            });

            setMatchDetails((previousMatchDetails) => ({
                ...previousMatchDetails,
                winningTeam: selectedWinningTeam
            }));

            setWinnerUpdateMessage('Winning team updated successfully.'); 

        } catch (error) {
            console.error('Winner update error: ', error);
            setWinnerUpdateError('Failed to update winning team.');
        } finally {
            setIsSavingWinner(false);
        }

    }

    return (
        <div>
            <Card className='text-center mb-3'>
                <Card.Header as='h1' className='display-5 fw-bold'>Match {matchID} Details</Card.Header>
            </Card>

            <div className='px-4'>

                {isLoadingMatchDetails && (
                    <p className='text-center fw-semibold'>Loading preliminary match details...</p>
                )}

                {matchDetailsError && (
                    <p className='text-center text-danger fw-semibold'>{matchDetailsError}</p>
                )}

                {!isLoadingMatchDetails && !matchDetailsError && matchDetails && (
                    <>
                        <Card className='mb-3'>
                            <Card.Header as='h2' className='fw-bold'>Match Information</Card.Header>
                            <Card.Body>
                                <p><strong>State:</strong> {matchDetails.stateTeamUniversity} ({matchDetails.stateTeam})</p>
                                <p><strong>Victim:</strong> {matchDetails.victimTeamUniversity} ({matchDetails.victimTeam})</p>
                                <p><strong>Day & Time:</strong> {matchDetails.matchDay} at {matchDetails.matchTime}</p>
                                <p><strong>Classroom:</strong> {matchDetails.roomNumber}</p>
                            </Card.Body>
                        </Card>

                        <Card className='mb-3'>
                            <Card.Header as='h2' className='fw-bold'>Assigned Judges</Card.Header>
                            <Card.Body>
                                {matchDetails.assignedJudges?.length > 0 ? (
                                    matchDetails.assignedJudges.map((currentJudge) => (
                                        <p key={currentJudge.judgeID}>{currentJudge.judgeName} (ID: {currentJudge.judgeID})</p>
                                    ))
                                ) : (
                                    <p>No judges assigned yet.</p>
                                )}
                            </Card.Body>
                        </Card>

                        <Card className='mb-3'>
                            <Card.Header as='h2' className='fw-bold'>Winner Selection</Card.Header>
                            <Card.Body>
                                <Form.Group className='mb-3'>
                                    <Form.Label className='fw-bold'>Winning Team</Form.Label>
                                    <Form.Select value={selectedWinningTeam} onChange={(event) => setSelectedWinningTeam(event.target.value)}>
                                        <option value=''>Select Winning Team</option>
                                        <option value={matchDetails.stateTeam}>{matchDetails.stateTeamUniversity} ({matchDetails.stateTeam})</option>
                                        <option value={matchDetails.victimTeam}>{matchDetails.victimTeamUniversity} ({matchDetails.victimTeam})</option>
                                    </Form.Select>
                                </Form.Group>

                                <Button onClick={handleSaveWinner} disabled={isSavingWinner || !selectedWinningTeam}>{isSavingWinner ? 'Saving...' : 'Save Winner'}</Button>
                                
                                {winnerUpdateMessage && (
                                    <p className='text-success fw-semibold mt-2'>{winnerUpdateMessage}</p>
                                )}

                                {winnerUpdateError && (
                                    <p className='text-danger fw-semibold mt-2'>{winnerUpdateError}</p>
                                )}

                            </Card.Body>
                        </Card>
                    </>
                )}
            </div>

            <div className='d-grid gap-3 px-4'>
                <Button onClick={() => navigate('/oral/preliminaries')}>Return to Preliminaries</Button>
                <Button variant='danger' onClick={() => navigate('/')}>Logout</Button>
            </div>

        </div>
    )

}

export default PreliminaryMatchDetails; 