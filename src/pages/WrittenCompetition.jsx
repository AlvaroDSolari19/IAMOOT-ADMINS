import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Table } from 'react-bootstrap';

import api from '../services/api';

function WrittenCompetition() {

    const navigate = useNavigate();

    const [selectedView, setSelectedView] = useState('status');
    const [selectedLanguage, setSelectedLanguage] = useState('ALL');
    const [sortColumn, setSortColumn] = useState('teamID');
    const [sortDirection, setSortDirection] = useState('asc');

    const [submissionData, setSubmissionData] = useState([]);
    const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(true);
    const [submissionError, setSubmissionError] = useState('');

    const [resultsData, setResultsData] = useState([]);
    const [isLoadingResults, setIsLoadingResults] = useState(true);
    const [resultsError, setResultsError] = useState('');

    useEffect(() => {
        const savedReturnState = sessionStorage.getItem('writtenResultsReturnState');
        if (!savedReturnState) return;

        const parsedReturnState = JSON.parse(savedReturnState);
        setSelectedView(parsedReturnState.selectedView);
        setSelectedLanguage(parsedReturnState.selectedLanguage);
        setSortColumn('teamID');
        setSortDirection('asc');

        sessionStorage.removeItem('writtenResultsReturnState');
    }, []);

    useEffect(() => {
        const getSubmissionData = async () => {
            try {
                const submissionResponse = await api.get('/api/admin/written/submissions');
                setSubmissionData(submissionResponse.data.submissions || []);
            } catch (error) {
                console.error('Written submission status error: ', error);
                setSubmissionError('Unable to retrieve written submission status.');
            } finally {
                setIsLoadingSubmissions(false);
            }
        }

        getSubmissionData();
    }, []);

    useEffect(() => {
        const getResultsData = async () => {
            try {
                const resultsResponse = await api.get('/api/admin/written/results');
                setResultsData(resultsResponse.data.results || []);
            } catch (error) {
                console.error('Written results error: ', error);
                setResultsError('Unable to retrieve written results.');
            } finally {
                setIsLoadingResults(false);
            }
        }

        getResultsData();
    }, []);

    const formatScore = (scoreValue) => {
        if (scoreValue === null || scoreValue === undefined) return 'N/A';
        return Number.isInteger(scoreValue) ? scoreValue : scoreValue.toFixed(2); 
    }

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

        if (firstValue === null) return 1;
        if (secondValue === null) return -1;

        return sortDirection === 'asc' ? (firstValue - secondValue) : (secondValue - firstValue)
    })

    const handleSort = (columnName) => {
        if(sortColumn === columnName){
            setSortColumn('teamID'); 
            setSortDirection('asc');
            return;
        }
        
        setSortColumn(columnName);
        setSortDirection('desc');
    }

    const handleShowResults = () => {
        setSelectedView('results');
        setSelectedLanguage('ALL');
        setSortColumn('teamID');
        setSortDirection('asc');
    }

    const handleTeamClick = (teamID) => {
        const returnState = {
            selectedView,
            selectedLanguage
        };

        sessionStorage.setItem('writtenResultsReturnState', JSON.stringify(returnState));
        navigate(`/written/team/${teamID}`);
    }

    return (
        <div>
            <Card className='text-center mb-3'>
                <Card.Header as='h1' className='display-5 fw-bold'>Written Competition</Card.Header>
            </Card>

            <div className='px-4 mb-3'>
                <div className='row g-2'>
                    <div className='col-6'>
                        <Button className='w-100' active={selectedView === 'status'} onClick={() => setSelectedView('status')}>Submission Status</Button>
                    </div>
                    <div className='col-6'>
                        <Button className='w-100' active={selectedView === 'results'} onClick={handleShowResults}>Results</Button>
                    </div>
                </div>
            </div>

            <div className='px-4'>
                {selectedView === 'status' && (
                    <>
                        {isLoadingSubmissions && (
                            <p className='text-center fw-semibold'>Loading submission status...</p>
                        )}

                        {submissionError && (
                            <p className='text-center text-danger fw-semibold'>{submissionError}</p>
                        )}

                        {!isLoadingSubmissions && !submissionError && (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Team ID</th>
                                        <th>University</th>
                                        <th>Language</th>
                                        <th>State Memorandum</th>
                                        <th>Victim Memorandum</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedSubmissionData.map((currentTeam) => {
                                        const memorandumStatus = currentTeam.hasSubmittedMemoranda ? 'Submitted' : 'Pending';

                                        return (
                                            <tr key={currentTeam.teamID}>
                                                <td>{currentTeam.teamID}</td>
                                                <td>{currentTeam.universityName}</td>
                                                <td>{currentTeam.teamLanguage}</td>
                                                <td>{memorandumStatus}</td>
                                                <td>{memorandumStatus}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        )}
                    </>
                )}

                {selectedView === 'results' && (
                    <>
                        {isLoadingResults && (
                            <p className='text-center fw-semibold'>Loading written results...</p>
                        )}

                        {resultsError && (
                            <p className='text-center text-danger fw-semibold'>{resultsError}</p>
                        )}

                        {!isLoadingResults && !resultsError && (
                            <>
                                <div className='mb-3'>
                                    <Form.Group>
                                        <Form.Label className='fw-bold'>Filter by Language</Form.Label>
                                        <Form.Select value={selectedLanguage} onChange={(event) => setSelectedLanguage(event.target.value)}>
                                            <option value='ALL'>All Languages</option>
                                            <option value='EN'>English</option>
                                            <option value='SPA'>Spanish</option>
                                            <option value='POR'>Portuguese</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>

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
                                            <tr key={currentTeam.teamID} onClick={() => handleTeamClick(currentTeam.teamID)} style={{ cursor: 'pointer' }}>
                                                <td>{currentTeam.teamID}</td>
                                                <td>{currentTeam.universityName}</td>
                                                <td>{currentTeam.teamLanguage}</td>
                                                <td>{formatScore(currentTeam.stateAverage)}</td>
                                                <td>{formatScore(currentTeam.victimAverage)}</td>
                                                <td>{formatScore(currentTeam.combinedAverage)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </>
                        )}
                    </>
                )}
            </div>

            <div className='d-grid gap-3 px-4'>
                <Button onClick={() => navigate('/home')}>Return to Competition Selection</Button>
                <Button variant='danger' onClick={() => navigate('/')}>Logout</Button>
            </div>
        </div>

    )

}

export default WrittenCompetition; 