import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Table } from 'react-bootstrap';

function IndividualAwards() {

    const speakerResults = [
        {
            speakerID: '12A',
            speakerName: 'Maria Gonzalez',
            universityName: 'Universidad de Buenos Aires',
            speakerLanguage: 'SPA',
            preliminaryAverage: 94.5
        },
        {
            speakerID: '12B',
            speakerName: 'Carlos Rivera',
            universityName: 'Universidad de Buenos Aires',
            speakerLanguage: 'SPA',
            preliminaryAverage: 91.2
        },
        {
            speakerID: '3A',
            speakerName: 'Emily Carter',
            universityName: 'Harvard University',
            speakerLanguage: 'EN',
            preliminaryAverage: 96.1
        },
        {
            speakerID: '3B',
            speakerName: 'James Miller',
            universityName: 'Harvard University',
            speakerLanguage: 'EN',
            preliminaryAverage: 89.7
        },
        {
            speakerID: '27A',
            speakerName: 'Ana Souza',
            universityName: 'Universidade de São Paulo',
            speakerLanguage: 'POR',
            preliminaryAverage: 95.3
        },
        {
            speakerID: '27B',
            speakerName: 'Lucas Pereira',
            universityName: 'Universidade de São Paulo',
            speakerLanguage: 'POR',
            preliminaryAverage: 90.8
        }
    ];

    const navigate = useNavigate();

    const [selectedLanguage, setSelectedLanguage] = useState('ALL');

    const filteredSpeakerResults = speakerResults.filter((currentSpeaker) => {
        if (selectedLanguage === 'ALL'){
            return true; 
        }

        return currentSpeaker.speakerLanguage === selectedLanguage; 
    });

    const sortedSpeakerResults = [...filteredSpeakerResults].sort((firstSpeaker, secondSpeaker) => {
        return secondSpeaker.preliminaryAverage - firstSpeaker.preliminaryAverage; 
    });

    return (
        <div>
            <Card className='text-center mb-3'>
                <Card.Header as='h1' className='display-5 fw-bold'>Individual Awards</Card.Header>
            </Card>

            <div className='px-4 mb-3'>
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

            <div className='px-4'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Speaker ID</th>
                            <th>Speaker Name</th>
                            <th>University</th>
                            <th>Language</th>
                            <th>Preliminary Average</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sortedSpeakerResults.map((currentSpeaker) => (
                            <tr key={currentSpeaker.speakerID}>
                                <td>{currentSpeaker.speakerID}</td>
                                <td>{currentSpeaker.speakerName}</td>
                                <td>{currentSpeaker.universityName}</td>
                                <td>{currentSpeaker.speakerLanguage}</td>
                                <td>{currentSpeaker.preliminaryAverage}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <div className='d-grid gap-3 px-4'>
                <Button onClick={() => navigate('/oral')}>Return to Oral Competition</Button>
                <Button variant='danger' onClick={() => navigate('/')}>Logout</Button>
            </div>

        </div>
    )

}

export default IndividualAwards; 