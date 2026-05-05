import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Table } from 'react-bootstrap';

function Semifinals() {

    const semifinalMatches = [
        {
            matchID: 'S1',
            matchDay: 'Thursday',
            matchTime: '10:30 AM',
            stateTeamID: '12',
            stateUniversity: 'Universidad de Buenos Aires',
            victimTeamID: '3',
            victimUniversity: 'Harvard University',
            matchClassroom: 'Room 101'
        },
        {
            matchID: 'S2',
            matchDay: 'Thursday',
            matchTime: '1:00 PM',
            stateTeamID: '1',
            stateUniversity: 'Georgetown University',
            victimTeamID: '27',
            victimUniversity: 'Universidade de São Paulo',
            matchClassroom: 'Room 102'
        }
    ];

    const semifinalResults = [
        {
            teamID: '12',
            universityName: 'Universidad de Buenos Aires',
            teamRole: 'State',
            semifinalAverage: 91.5
        },
        {
            teamID: '3',
            universityName: 'Harvard University',
            teamRole: 'Victim',
            semifinalAverage: 89.25
        },
        {
            teamID: '1',
            universityName: 'Georgetown University',
            teamRole: 'State',
            semifinalAverage: 88.75
        },
        {
            teamID: '27',
            universityName: 'Universidade de São Paulo',
            teamRole: 'Victim',
            semifinalAverage: 92.1
        }
    ];

    const navigate = useNavigate();

    const [selectedView, setSelectedView] = useState('matches');
    const [selectedRole, setSelectedRole] = useState('ALL'); 

    const filteredSemifinalResults = semifinalResults.filter((currentTeam) => {
        if (selectedRole === 'ALL'){
            return true; 
        }

        return currentTeam.teamRole === selectedRole; 
    })

    const sortedSemifinalResults = [...filteredSemifinalResults].sort((firstTeam, secondTeam) => {
        return secondTeam.semifinalAverage - firstTeam.semifinalAverage; 
    })

    return (
        <div>
            <Card className='text-center mb-3'>
                <Card.Header as='h1' className='display-5 fw-bold'>Semifinals</Card.Header>
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
                    <Table striped bordered hover>
                        <thead>
                            <th>Match ID</th>
                            <th>State</th>
                            <th>Victim</th>
                            <th>Day & Time</th>
                            <th>Classroom</th>
                        </thead>

                        <tbody>
                            {semifinalMatches.map((currentMatch) => (
                                <tr key={currentMatch.matchID}>
                                    <td>{currentMatch.matchID}</td>
                                    <td>{currentMatch.stateUniversity} ({currentMatch.stateTeamID})</td>
                                    <td>{currentMatch.victimUniversity} ({currentMatch.victimTeamID})</td>
                                    <td>{currentMatch.matchDay} at {currentMatch.matchTime}</td>
                                    <td>{currentMatch.matchClassroom}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}

                {selectedView === 'results' && (
                    <>
                        <div className='mb-3'>
                            <Form.Group>
                                <Form.Label className='fw-bold'>Filter by Role</Form.Label>
                                <Form.Select value={selectedRole} onChange={(event) => setSelectedRole(event.target.value)}>
                                    <option value='ALL'>All Roles</option>
                                    <option value='State'>State</option>
                                    <option value='Victim'>Victim</option>
                                </Form.Select>
                            </Form.Group>
                        </div>

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Team ID</th>
                                    <th>University</th>
                                    <th>Role</th>
                                    <th>Semifinal Average</th>
                                </tr>
                            </thead>

                            <tbody>
                                {sortedSemifinalResults.map((currentTeam) => (
                                    <tr key={currentTeam.teamID}>
                                        <td>{currentTeam.teamID}</td>
                                        <td>{currentTeam.universityName}</td>
                                        <td>{currentTeam.teamRole}</td>
                                        <td>{currentTeam.semifinalAverage}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                )}
            </div>

            <div className='d-grid gap-3 px-4'>
                <Button onClick={() => navigate('/oral')}>Return to Oral Competition</Button>
                <Button variant='danger' onClick={() => navigate('/')}>Logout</Button>
            </div>

        </div>
    )
}

export default Semifinals; 