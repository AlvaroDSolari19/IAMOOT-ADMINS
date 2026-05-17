import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Table } from 'react-bootstrap';

import api from '../services/api';

function Preliminaries() {

    const navigate = useNavigate();

    const [selectedView, setSelectedView] = useState('matches');
    const [selectedDay, setSelectedDay] = useState('ALL');

    const [preliminaryMatches, setPreliminaryMatches] = useState([]);
    const [isLoadingMatches, setIsLoadingMatches] = useState(true);
    const [matchesError, setMatchesError] = useState('');

    useEffect(() => {
        const savedSelectedDay = sessionStorage.getItem('preliminaryMatchesSelectedDay');
        if (!savedSelectedDay) return;

        setSelectedDay(savedSelectedDay);
        sessionStorage.removeItem('preliminaryMatchesSelectedDay');
    }, []);

    useEffect(() => {
        const getPreliminaryMatches = async () => {
            try {
                const preliminaryMatchesResponse = await api.get('/api/admin/oral/preliminary-matches');
                setPreliminaryMatches(preliminaryMatchesResponse.data.preliminaryMatches || []);
            } catch (error) {
                console.error('Preliminary matches fetch error: ', error);
                setMatchesError('Failed to load preliminary matches');
            } finally {
                setIsLoadingMatches(false);
            }
        }

        getPreliminaryMatches();
    }, []);

    const filteredMatches = preliminaryMatches.filter((currentMatch) => {
        if (selectedDay === 'ALL') {
            return true;
        }

        return currentMatch.matchDay === selectedDay;
    });

    const handleMatchClick = (matchID) => {
        sessionStorage.setItem('preliminaryMatchesSelectedDay', selectedDay);
        navigate(`/oral/preliminaries/match/${matchID}`);
    }

    const preliminaryResults = [];
    const sortedResults = [...preliminaryResults].sort((firstTeam, secondTeam) => {
        if (firstTeam.numberOfWins !== secondTeam.numberOfWins) {
            return secondTeam.numberOfWins - firstTeam.numberOfWins;
        }

        return secondTeam.memorandumAverage - firstTeam.memorandumAverage;
    });

    const getRowClass = (currentTeam) => {
        if (currentTeam.numberOfWins === 2) return 'table-success';
        if (currentTeam.numberOfLosses === 2) return 'table-danger';
        return 'table-warning';
    }

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
                    <>
                        <div className='mb-3'>
                            <Form.Group>
                                <Form.Label className='fw-bold'>Filter by Day</Form.Label>
                                <Form.Select value={selectedDay} onChange={(event) => setSelectedDay(event.target.value)}>
                                    <option value='ALL'>All Days</option>
                                    <option value='Monday'>Monday</option>
                                    <option value='Tuesday'>Tuesday</option>
                                    <option value='Wednesday'>Wednesday</option>
                                </Form.Select>
                            </Form.Group>
                        </div>

                        {isLoadingMatches && (
                            <p className='text-center fw-semibold'>Loading preliminary matches...</p>
                        )}

                        {matchesError && (
                            <p className='text-center text-danger fw-semibold'>{matchesError}</p>
                        )}

                        {!isLoadingMatches && !matchesError && (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th style={{ whiteSpace: 'nowrap'}}>Match ID</th>
                                        <th>State</th>
                                        <th >Victim</th>
                                        <th style={{ whiteSpace: 'nowrap'}}>Day & Time</th>
                                        <th style={{ whiteSpace: 'nowrap'}}>Classroom</th>
                                        <th style={{ whiteSpace: 'nowrap'}}>Winner</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredMatches.map((currentMatch) => (
                                        <tr key={currentMatch.matchID} style={{ cursor: 'pointer' }} onClick={() => handleMatchClick(currentMatch.matchID)}>
                                            <td style={{ whiteSpace: 'nowrap'}}>{currentMatch.matchID}</td>
                                            <td>{currentMatch.stateTeamUniversity} ({currentMatch.stateTeam})</td>
                                            <td>{currentMatch.victimTeamUniversity} ({currentMatch.victimTeam})</td>
                                            <td style={{ whiteSpace: 'nowrap'}}>{currentMatch.matchDay} at {currentMatch.matchTime}</td>
                                            <td style={{ whiteSpace: 'nowrap'}}>{currentMatch.roomNumber}</td>
                                            <td style={{ whiteSpace: 'nowrap'}}>{currentMatch.winningTeam ? 'Selected' : 'Pending'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </>
                )}

                {selectedView === 'results' && (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Team ID</th>
                                <th>University</th>
                                <th>Wins</th>
                                <th>Losses</th>
                                <th>Memorandum Average</th>
                            </tr>
                        </thead>

                        <tbody>
                            {sortedResults.map((currentTeam) => (
                                <tr key={currentTeam.teamID} className={getRowClass(currentTeam)}>
                                    <td>{currentTeam.teamID}</td>
                                    <td>{currentTeam.universityName}</td>
                                    <td>{currentTeam.numberOfWins}</td>
                                    <td>{currentTeam.numberOfLosses}</td>
                                    <td>{currentTeam.memorandumAverage}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>

            <div className='d-grid gap-3 px-4'>
                <Button onClick={() => navigate('/oral')}>Return to Oral Competition</Button>
                <Button variant='danger' onClick={() => navigate('/')}>Logout</Button>
            </div>

        </div>
    )
}

export default Preliminaries; 