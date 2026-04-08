import { useNavigate } from 'react-router-dom' 
import { Button, Card, Form } from 'react-bootstrap'

function Login() {

    const navigate = useNavigate(); 

    const handleLogin = () => {
        navigate('/home'); 
    }

    return <div>
        <Card className='text-center mb-3'>
            <Card.Header as='h1' className='display-5 fw-bold'>IAMOOT 2026 - Access the Platform</Card.Header>
        </Card>

        <Form onSubmit={handleLogin} noValidate>
            <Form.Group className='mb-3 px-4'>
                <div className='d-flex align-items-center'>
                    <Form.Label className='fw-bold text-nowrap d-flex align-items-center mb-0 me-2' style={{ height: '38px' }}>Email</Form.Label>
                    <Form.Control />
                </div>
            </Form.Group>

            <Form.Group className='mb-3 px-4'>
                <div className='d-flex align-items-center'>
                    <Form.Label className='fw-bold text-nowrap d-flex align-items-center mb-0 me-2' style={{ height: '38px' }}>Password</Form.Label>
                    <Form.Control type='password' /> 
                </div>
            </Form.Group>

            <div className='d-grid gap-2 px-4'>
                <Button type='submit'>Login</Button>
            </div>

        </Form>

    </div>
}

export default Login;