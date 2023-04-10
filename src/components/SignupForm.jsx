import React from 'react'
import { Container, Row, Col, Form, Button, Card, Alert, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.svg'

import useSignupUser from '../hooks/useSignupUser'
import useForm from '../hooks/useForm'

const SignupForm = () => {
	const [ values, handleChange, resetForm ] = useForm({
		email: "",
		password: "",
		confirmPassword: ""
	})

	const { isLoading, createUser, message } = useSignupUser()

	const handleSubmit = async (e) => {
		e.preventDefault()

		await createUser(values)
		resetForm()
	}

	return (
		<Container className=" center-y">
			<Row>
				<Col xs={{ span: 6, offset: 3 }} md={{ span: 4, offset: 4 }} className="logo-wrapper">
					<Image src={logo} fluid />
				</Col>
			</Row>

			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title className="mb-3">Skapa konto</Card.Title>

							{message && (<Alert variant="danger">
								{message}
							</Alert>)}

							<Form onSubmit={handleSubmit}>

								<Form.Group id="displayName" className="mb-3">
									<Form.Label>Epost</Form.Label>
									<Form.Control name='email' onChange={handleChange} value={values.email} />
								</Form.Group>

								<Form.Group id="password" className="mb-3">
									<Form.Label>Lösenord</Form.Label>
									<Form.Control name='password' type="password" onChange={handleChange} value={values.password} />
								</Form.Group>

								<Form.Group id="password-confirm" className="mb-3">
									<Form.Label>Bekräfta lösenord</Form.Label>
									<Form.Control name='confirmPassword' type="password" onChange={handleChange} value={values.confirmPassword} />
								</Form.Group>

								<Button disabled={isLoading} type="submit">Skapa konto</Button>
							</Form>

						</Card.Body>
					</Card>

					<div className="text-center mt-3">
						Redan en inloggning? <Link to="/login">Logga in</Link>
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default SignupForm