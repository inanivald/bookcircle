import React, { useRef, useState } from 'react'
import { Row, Col, Form, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ResetPassword = () => {

	const emailRef = useRef()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const { reset } = useAuth()
	const navigate = useNavigate()

	const handleReset = async (e) => {
		e.preventDefault()

		setError(null);

		try {
			setLoading(true)
			await reset(emailRef.current.value)
			navigate('/confirmation')
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
						<Card.Title>Forgot password?</Card.Title>

						{error && (<Alert variant="danger">{error}</Alert>)}

						<Form onSubmit={handleReset}>

							<Form.Group id="email">
								<Form.Label>Email</Form.Label>
								<Form.Control type="email" ref={emailRef} required />
							</Form.Group>

                         <button disabled={loading} type="submit" className="btn theme-btn">Send</button>

						</Form>
					</Card.Body>
				</Card>
				<div className="text-center mt-2">
					<Link to="/signup" className="btn theme-btn book-card">Sign Up?</Link>
				</div>
			</Col>
		</Row>
	</>
			
	)
}

export default ResetPassword



