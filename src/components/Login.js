import React, { useRef, useState } from 'react'
import { Row, Col, Form, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {

	const emailRef = useRef()
	const passwordRef = useRef()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const { login } = useAuth()
	const navigate = useNavigate()


	const handleLogin = async (e) => {
		e.preventDefault()

		setError(null);

		try {
			setLoading(true)
			await login(emailRef.current.value, passwordRef.current.value)
			navigate('/')
		} catch (e) {
			setError(e.message)
			setLoading(false)
		}
	}

	return (
		
		<>
		<Row>
			<Col md={{ span: 6, offset: 3 }}>
				<Card className="mt-5">
					<Card.Body>
						<Card.Title>Log in</Card.Title>

						{error && (<Alert variant="danger">{error}</Alert>)}

						<Form onSubmit={handleLogin}>

							<Form.Group id="email">
								<Form.Label>Email</Form.Label>
								<Form.Control type="email" ref={emailRef} required />
							</Form.Group>

							<Form.Group id="password">
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" ref={passwordRef} required />
							</Form.Group>

							<button disabled={loading} type="submit" className="btn theme-btn">Log in</button>

						</Form>
					</Card.Body>
				</Card>
				<div className="text-center mt-5">
					<Link to="/signup" className="btn theme-btn book-card mr-3">Sign Up?</Link><Link to="/reset-password" className="btn theme-btn book-card">Forgot password?</Link>
				</div>
			</Col>
		</Row>
	</>
			
	
	)
}

export default Login



