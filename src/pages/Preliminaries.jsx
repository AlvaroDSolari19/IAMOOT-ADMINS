import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Table } from 'react-bootstrap';

function Preliminaries() {

    const preliminaryMatches = [
        {
            matchID: 'M1',
            matchDay: 'Monday',
            matchTime: '10:30 AM',
            stateTeamID: '12',
            stateUniversity: 'Universidad de Buenos Aires',
            victimTeamID: '3',
            victimUniversity: 'Harvard University',
            matchClassroom: 'Room 101'
        },
        {
            matchID: 'M2',
            matchDay: 'Monday',
            matchTime: '1:00 PM',
            stateTeamID: '6',
            stateUniversity: 'Universidad de Chile',
            victimTeamID: '9',
            victimUniversity: 'University of Oxford',
            matchClassroom: 'Room 102'
        },
        {
            matchID: 'T1',
            matchDay: 'Tuesday',
            matchTime: '10:30 AM',
            stateTeamID: '18',
            stateUniversity: 'Universidad Complutense de Madrid',
            victimTeamID: '21',
            victimUniversity: 'Pontifícia Universidade Católica do Rio de Janeiro',
            matchClassroom: 'Room 201'
        },
        {
            matchID: 'W1',
            matchDay: 'Wednesday',
            matchTime: '9:00 AM',
            stateTeamID: '27',
            stateUniversity: 'Universidade de São Paulo',
            victimTeamID: '1',
            victimUniversity: 'Georgetown University',
            matchClassroom: 'Room 301'
        }
    ];

    const preliminaryResults = [
        {
            teamID: '12',
            universityName: 'Universidad de Buenos Aires',
            numberOfWins: 2,
            numberOfLosses: 0,
            memorandumAverage: 87.85
        },
        {
            teamID: '3',
            universityName: 'Harvard University',
            numberOfWins: 2,
            numberOfLosses: 0,
            memorandumAverage: 90.75
        },
        {
            teamID: '27',
            universityName: 'Universidade de São Paulo',
            numberOfWins: 1,
            numberOfLosses: 1,
            memorandumAverage: 83.25
        },
        {
            teamID: '1',
            universityName: 'Georgetown University',
            numberOfWins: 1,
            numberOfLosses: 1,
            memorandumAverage: 89.6
        },
        {
            teamID: '18',
            universityName: 'Universidad Complutense de Madrid',
            numberOfWins: 0,
            numberOfLosses: 2,
            memorandumAverage: 88.55
        }
    ];

    const navigate = useNavigate();

    const [selectedView, setSelectedView] = useState('matches');
    const [selectedDay, setSelectedDay] = useState('ALL');

    useEffect(() => {
        const savedSelectedDay = sessionStorage.getItem('preliminaryMatchesSelectedDay');
        if (!savedSelectedDay) return;

        setSelectedDay(savedSelectedDay);
        sessionStorage.removeItem('preliminaryMatchesSelectedDay');
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

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Match ID</th>
                                    <th>State</th>
                                    <th>Victim</th>
                                    <th>Day & Time</th>
                                    <th>Classroom</th>
                                    <th>Winner</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredMatches.map((currentMatch) => (
                                    <tr key={currentMatch.matchID} style={{ cursor: 'pointer' }} onClick={() => handleMatchClick(currentMatch.matchID)}>
                                        <td>{currentMatch.matchID}</td>
                                        <td>{currentMatch.stateUniversity} ({currentMatch.stateTeamID})</td>
                                        <td>{currentMatch.victimUniversity} ({currentMatch.victimTeamID})</td>
                                        <td>{currentMatch.matchDay} at {currentMatch.matchTime}</td>
                                        <td>{currentMatch.matchClassroom}</td>
                                        <td>{currentMatch.winningTeamID ? 'Selected' : 'Pending'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
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