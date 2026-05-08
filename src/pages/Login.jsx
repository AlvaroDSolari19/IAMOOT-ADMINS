import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Card, Form } from 'react-bootstrap'

import api from '../services/api'

function Login() {

    const navigate = useNavigate();
    const [authError, setAuthError] = useState('');

    const {
        register,
        handleSubmit,
        setFocus,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            email: ''
        }
    });

    const handleFormSubmit = async (someData) => {

        try {
            const loginResponse = await api.post('/api/admin/login', {
                email: someData.email
            });

            const authToken = loginResponse.data?.token;
            if (authToken) localStorage.setItem('authToken', authToken);

            navigate('/home', { replace: true });

        } catch (err) {
            setAuthError('Email is not authorized for admin access.');
            setFocus(email);
        }

    }

    return <div>
        <Card className='text-center mb-3'>
            <Card.Header as='h1' className='display-5 fw-bold'>Access the Platform</Card.Header>
        </Card>

        {authError && (
            <Alert variant='danger' className='mx-4 text-center fw-semibold'>{authError}</Alert>
        )}

        <Form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
            <Form.Group className='mb-3 px-4'>
                <div className='d-flex align-items-center'>
                    <Form.Label className='fw-bold text-nowrap d-flex align-items-center mb-0 me-2' style={{ height: '38px' }}>Email</Form.Label>
                    <Form.Control type='email' autoComplete='email' disabled={isSubmitting} isInvalid={!!errors.email} {...register('email', {
                        required: 'Email is required.', 
                        pattern: {
                            value: /^\S+@\S+\.\S+$/, 
                            message: 'Please enter a valid email address.'
                        }, 
                        onChange: () => authError && setAuthError('')
                    })} />
                </div>
                
                {errors.email && (
                    <Alert variant='danger' className='mt-2 py-2'>{errors.email.message}</Alert>
                )}

            </Form.Group>

            <div className='d-grid gap-2 px-4'>
                <Button type='submit' disabled={isSubmitting}>Login</Button>
            </div>

        </Form>

    </div>
}

export default Login;