import { useRef, useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Card, Alert, } from 'react-bootstrap'
import { useAuthContext } from '../contexts/AuthContext'

import useForm from '../hooks/useForm'
import Dropzone from '../components/Dropzone/Dropzone'
import { useQueryClient } from 'react-query'
import useDoc from '../hooks/useDoc'
import useUploadImg from '../hooks/useUploadImg'
import UserAvatar from '../components/UserProfileImage'


const UpdateProfile = () => {
	const [feedback, setFeedback] = useState(null)
	const [loading, setLoading] = useState(false)
	const {
		currentUser,
		setDisplayName,
		setEmail,
		setPassword
	} = useAuthContext()

	const img = useDoc(null, currentUser.uid)
	const fileUploader = useUploadImg()
	const queryClient = useQueryClient()

	useEffect(() => {
		if (fileUploader.progress === 100) {
			queryClient.invalidateQueries("images")
		}
	}, [fileUploader.progress])

	const [values, handleChange] = useForm({
		username: currentUser.displayName ? currentUser.displayName : "",
		email: currentUser.email ? currentUser.email : "",
		password: "",
		confirmPassword: ""
	}, false)

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (values.password !== values.confirmPassword) {
			return setFeedback({
				type: "warning",
				msg: "Lösenordet matchar inte!!!"
			})
		}
		
		setFeedback(null)

		try {
			setLoading(true)

			if (values.userName !== currentUser.displayName) {
				console.log("Byter displayName");
				await setDisplayName(values.userName)
			}

			if (values.email !== user.email) {
				console.log("Byter email");
				await setEmail(values.email)
			}

			if (values.password) {
				console.log("Byter lösen");
				await setPassword(values.password)
			}

			setFeedback({
				type: "Success",
				msg: "Profil uppdaterad!!"
			})
			setLoading(false)
		} catch (e) {
			setFeedback({
				type: "Warning",
				msg: "ERROR, Prova logga ut och sedan in igen"
			})
			setLoading(false)
		}
	}

	return (
		<Container className="py-3 center-y">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Header as="h5">Update Profile</Card.Header>
						<Card.Body>
							{feedback && (
								<Alert variant={feedback.type}>
									{feedback.msg}
								</Alert>)
							}

							<Form onSubmit={handleSubmit}>
								{/*
									FORTSÄTT HÄR!!!!
								*/}
								<div className="d-flex justify-content-center my-3">
									{img && img?.docs.length > 0 ? (
										<UserAvatar docs={img.docs} />
									) : (
										<Dropzone fileUploader={fileUploader}/>
									)}
								</div>

								<Form.Group id="displayName" className="mb-3">
									<Form.Label>Name</Form.Label>
									<Form.Control name='username' onChange={handleChange} value={values.username} type="text" />
								</Form.Group>

								<Form.Group id="email" className="mb-3">
									<Form.Label>Email</Form.Label>
									<Form.Control name='email' onChange={handleChange} value={values.email} type="email"/>
								</Form.Group>

								<Form.Group id="password" className="mb-3">
									<Form.Label>New Password</Form.Label>
									<Form.Control name='password' onChange={handleChange} value={values.password} type="password" />
								</Form.Group>

								<Form.Group id="password-confirm" className="mb-3">
									<Form.Label>Confirm New Password</Form.Label>
									<Form.Control name='confirmPassword' onChange={handleChange} value={values.confirmPassword} type="password" />
								</Form.Group>

								<Button disabled={loading} type="submit" onClick={handleSubmit}>Update</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default UpdateProfile