import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Table } from 'react-bootstrap';

function WrittenCompetition() {

    const submissionData = [
        {
            teamID: '12',
            universityName: 'Universidad de Buenos Aires',
            teamLanguage: 'ES',
            stateStatus: 'Submitted',
            victimStatus: 'Pending'
        },
        {
            teamID: '3',
            universityName: 'Harvard University',
            teamLanguage: 'EN',
            stateStatus: 'Submitted',
            victimStatus: 'Submitted'
        },
        {
            teamID: '27',
            universityName: 'Universidade de São Paulo',
            teamLanguage: 'POR',
            stateStatus: 'Pending',
            victimStatus: 'Submitted'
        },
        {
            teamID: '1',
            universityName: 'Georgetown University',
            teamLanguage: 'EN',
            stateStatus: 'Submitted',
            victimStatus: 'Submitted'
        },
        {
            teamID: '18',
            universityName: 'Universidad Complutense de Madrid',
            teamLanguage: 'ES',
            stateStatus: 'Pending',
            victimStatus: 'Pending'
        },
        {
            teamID: '9',
            universityName: 'University of Oxford',
            teamLanguage: 'EN',
            stateStatus: 'Submitted',
            victimStatus: 'Pending'
        },
        {
            teamID: '21',
            universityName: 'Pontifícia Universidade Católica do Rio de Janeiro',
            teamLanguage: 'POR',
            stateStatus: 'Submitted',
            victimStatus: 'Submitted'
        },
        {
            teamID: '6',
            universityName: 'Universidad de Chile',
            teamLanguage: 'ES',
            stateStatus: 'Submitted',
            victimStatus: 'Submitted'
        }
    ]

    const resultsData = [
        {
            teamID: '12',
            universityName: 'Universidad de Buenos Aires',
            teamLanguage: 'ES',
            stateAverage: 84.5,
            victimAverage: 91.2,
            combinedAverage: 87.85
        },
        {
            teamID: '3',
            universityName: 'Harvard University',
            teamLanguage: 'EN',
            stateAverage: 93.1,
            victimAverage: 88.4,
            combinedAverage: 90.75
        },
        {
            teamID: '27',
            universityName: 'Universidade de São Paulo',
            teamLanguage: 'POR',
            stateAverage: 79.8,
            victimAverage: 86.7,
            combinedAverage: 83.25
        },
        {
            teamID: '1',
            universityName: 'Georgetown University',
            teamLanguage: 'EN',
            stateAverage: 88.9,
            victimAverage: 90.3,
            combinedAverage: 89.6
        },
        {
            teamID: '18',
            universityName: 'Universidad Complutense de Madrid',
            teamLanguage: 'ES',
            stateAverage: 91.5,
            victimAverage: 85.6,
            combinedAverage: 88.55
        },
        {
            teamID: '9',
            universityName: 'University of Oxford',
            teamLanguage: 'EN',
            stateAverage: 82.7,
            victimAverage: 94.1,
            combinedAverage: 88.4
        },
        {
            teamID: '21',
            universityName: 'Pontifícia Universidade Católica do Rio de Janeiro',
            teamLanguage: 'POR',
            stateAverage: 95.4,
            victimAverage: 89.2,
            combinedAverage: 92.3
        },
        {
            teamID: '6',
            universityName: 'Universidad de Chile',
            teamLanguage: 'ES',
            stateAverage: 87.3,
            victimAverage: 87.3,
            combinedAverage: 87.3
        }
    ];

    const navigate = useNavigate();

    const [view, setView] = useState('status');
    const [selectedLanguage, setSelectedLanguage] = useState('ALL');
    const [sortColumn, setSortColumn] = useState('teamID');
    const [sortDirection, setSortDirection] = useState('asc');

    const sortedSubmissionData = [...submissionData].sort((firstTeam, secondTeam) => {
        const firstTeamID = Number(firstTeam.teamID);
        const secondTeamID = Number(secondTeam.teamID);

        return firstTeamID - secondTeamID;
    })

    const filteredResultsData = resultsData.filter((currentTeam) => {
        if (selectedLanguage === 'ALL') {
            return true;
        }

        return currentTeam.teamLanguage === selectedLanguage;
    })

    const sortedResultsData = [...filteredResultsData].sort((firstTeam, secondTeam) => {
        if (sortColumn === 'teamID') {
            const firstTeamID = Number(firstTeam.teamID);
            const secondTeamID = Number(secondTeam.teamID);

            return sortDirection === 'asc' ? (firstTeamID - secondTeamID) : (secondTeamID - firstTeamID);
        }

        const firstValue = firstTeam[sortColumn];
        const secondValue = secondTeam[sortColumn];

        return sortDirection === 'asc' ? (firstValue - secondValue) : (secondValue - firstValue)
    })

    const handleSort = (columnName) => {
        setSortColumn(columnName);
        setSortDirection('desc'); 
    }

    const handleShowResults = () => {
        setView('results');
        setSelectedLanguage('ALL');
        setSortColumn('teamID');
        setSortDirection('asc');
    }

    return (
        <div>
            <Card className='text-center mb-3'>
                <Card.Header as='h1' className='display-5 fw-bold'>Written Competition</Card.Header>
            </Card>

            <div className='px-4 mb-3'>
                <div className='row g-2'>
                    <div className='col-6'>
                        <Button className='w-100' active={view === 'status'} onClick={() => setView('status')}>Submission Status</Button>
                    </div>
                    <div className='col-6'>
                        <Button className='w-100' active={view === 'results'} onClick={handleShowResults}>Results</Button>
                    </div>
                </div>
            </div>

            {view === 'results' && (
                <div className='px-4 mb-3'>
                    <Form.Group>
                        <Form.Label className='fw-bold'>Filter by Language</Form.Label>
                        <Form.Select value={selectedLanguage} onChange={(event) => setSelectedLanguage(event.target.value)}>
                            <option value='ALL'>All Languages</option>
                            <option value='EN'>English</option>
                            <option value='ES'>Español</option>
                            <option value='POR'>Português</option>
                        </Form.Select>
                    </Form.Group>
                </div>
            )}

            <div className='px-4'>
                {view === 'status' && (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Team ID</th>
                                <th>Univeristy</th>
                                <th>Language</th>
                                <th>State Memorandum</th>
                                <th>Victim Memorandum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedSubmissionData.map((currentTeam) => (
                                <tr key={currentTeam.teamID}>
                                    <td>{currentTeam.teamID}</td>
                                    <td>{currentTeam.universityName}</td>
                                    <td>{currentTeam.teamLanguage}</td>
                                    <td>{currentTeam.stateStatus}</td>
                                    <td>{currentTeam.victimStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}

                {view === 'results' && (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Team ID</th>
                                <th>University</th>
                                <th>Language</th>
                                <th onClick={() => handleSort('stateAverage')} style={{ cursor: 'pointer' }}>State Average {sortColumn === 'stateAverage' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                                <th onClick={() => handleSort('victimAverage')} style={{ cursor: 'pointer' }}>Victim Average {sortColumn === 'victimAverage' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                                <th onClick={() => handleSort('combinedAverage')} style={{ cursor: 'pointer' }}>Combined Average {sortColumn === 'combinedAverage' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedResultsData.map((currentTeam) => (
                                <tr key={currentTeam.teamID} onClick={() => navigate(`/written/team/${currentTeam.teamID}`)} style={{ cursor: 'pointer' }}>
                                    <td>{currentTeam.teamID}</td>
                                    <td>{currentTeam.universityName}</td>
                                    <td>{currentTeam.teamLanguage}</td>
                                    <td>{currentTeam.stateAverage}</td>
                                    <td>{currentTeam.victimAverage}</td>
                                    <td>{currentTeam.combinedAverage}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>

            <div className='d-grid gap-3 px-4'>
                <Button variant='danger' onClick={() => navigate('/')}>Logout</Button>
            </div>
        </div>

    )

}

export default WrittenCompetition; 