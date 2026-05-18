import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Form, Modal, Table } from 'react-bootstrap';

import api from '../services/api';

function PreliminaryMatchDetails() {

    const navigate = useNavigate();
    const { matchID } = useParams();

    const [matchDetails, setMatchDetails] = useState(null);
    const [isLoadingMatchDetails, setIsLoadingMatchDetails] = useState(true);
    const [matchDetailsError, setMatchDetailsError] = useState('');

    const [showRemoveJudgeModal, setShowRemoveJudgeModal] = useState(false);
    const [judgeToRemove, setJudgeToRemove] = useState(null);

    const [judgeSearchValue, setJudgeSearchValue] = useState('');
    const [matchingJudges, setMatchingJudges] = useState([]);
    const [selectedJudge, setSelectedJudge] = useState(null);

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

    useEffect(() => {

        const getMatchingJudges = async () => {

            try {

                if (!judgeSearchValue || selectedJudge) {
                    setMatchingJudges([]);
                    return;
                }

                const judgesResponse = await api.get(`/api/admin/oral/judges?judgeID=${judgeSearchValue}`);
                setMatchingJudges(judgesResponse.data.matchingJudges || []);

            } catch (error) {
                console.error('Oral judges search error: ', error);
            }

        }

        getMatchingJudges();

    }, [judgeSearchValue, selectedJudge]);

    const formatJudgeName = (judgeName) => {
        return judgeName.toLowerCase().split(' ').map((currentWord) => {
            return currentWord.charAt(0).toUpperCase() + currentWord.slice(1);
        }).join(' ');
    }

    const handleAddJudge = async () => {

        try {

            await api.patch(`/api/admin/oral/preliminary-match/${matchID}/judges`, {
                judgeID: selectedJudge.judgeID
            });

            setMatchDetails((previousMatchDetails) => ({
                ...previousMatchDetails,
                assignedJudges: [
                    ...(previousMatchDetails.assignedJudges || []), 
                    {
                        judgeID: selectedJudge.judgeID, 
                        judgeName: selectedJudge.fullName
                    }
                ]
            }));

            setSelectedJudge(null);
            setJudgeSearchValue('');
            setMatchingJudges([]);

        } catch (error) {
            console.error('Add judge error: ', error); 
        }

    }

    const handleShowRemoveJudgeModal = (currentJudge) => {
        setJudgeToRemove(currentJudge);
        setShowRemoveJudgeModal(true);
    }

    const handleRemoveJudge = async () => {

        try {

            await api.patch(`/api/admin/oral/preliminary-match/${matchID}/judges/remove`, {
                judgeID: judgeToRemove.judgeID
            });

            setMatchDetails((previousMatchDetails) => ({
                ...previousMatchDetails, 
                assignedJudges: previousMatchDetails.assignedJudges.filter((currentJudge) => {
                    return currentJudge.judgeID !== judgeToRemove.judgeID; 
                })
            }));

            handleCloseRemoveJudgeModal(); 

        } catch (error) {
            console.error('Remove judge error: ', error); 
        }

    }

    const handleCloseRemoveJudgeModal = () => {
        setShowRemoveJudgeModal(false);
        setJudgeToRemove(null);
    }

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
                            <Card.Header as='h2' className='fw-bold'>Assigned Judges ({matchDetails.assignedJudges?.length || 0})</Card.Header>
                            <Card.Body>
                                {matchDetails.assignedJudges?.length > 0 ? (
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Judge ID</th>
                                                <th>Judge Name</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {matchDetails.assignedJudges.map((currentJudge) => (
                                                <tr key={currentJudge.judgeID}>
                                                    <td>{currentJudge.judgeID}</td>
                                                    <td>{formatJudgeName(currentJudge.judgeName)}</td>
                                                    <td><Button variant='danger' size='sm' onClick={() => handleShowRemoveJudgeModal(currentJudge)}>Remove</Button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                ) : (
                                    <p>No judges assigned yet...</p>
                                )}
                                <hr />

                                <Form.Group className='mb-3'>
                                    <Form.Label className='fw-bold'>Add Judge</Form.Label>
                                    <Form.Control type='text' placeholder='Search judge by ID' value={judgeSearchValue} onChange={(event) => setJudgeSearchValue(event.target.value)} />
                                    {judgeSearchValue && (
                                        <div className='mb-3'>
                                            {matchingJudges.map((currentJudge) => (
                                                <Button
                                                    key={currentJudge.judgeID}
                                                    variant='outline-primary'
                                                    className='w-100 mb-2 text-start'
                                                    onClick={() => {
                                                        setSelectedJudge(currentJudge);
                                                        setJudgeSearchValue(`${currentJudge.judgeID} - ${formatJudgeName(currentJudge.fullName)}`);
                                                    }}
                                                >
                                                    {currentJudge.judgeID} - {formatJudgeName(currentJudge.fullName)}
                                                </Button>
                                            ))}
                                        </div>
                                    )}
                                </Form.Group>

                                <Button onClick={handleAddJudge} disabled={!selectedJudge}>Add Judge</Button>
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

            <Modal show={showRemoveJudgeModal} onHide={handleCloseRemoveJudgeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Remove Judge</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {judgeToRemove && (
                        <p>Are you sure you want to remove <strong>{judgeToRemove.judgeID} - {judgeToRemove.judgeName}</strong> from Match {matchID}?</p>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='secondary' onClick={handleCloseRemoveJudgeModal}>Cancel</Button>
                    <Button variant='danger' onClick={handleRemoveJudge}>Remove Judge</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )

}

export default PreliminaryMatchDetails; 