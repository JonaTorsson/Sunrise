import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const SignupForm = () => {
	const { signup } = useAuthContext()
	const emailRef = useRef()
	const displayNameRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const [loading, setLoading] = useState(false)
	const [photo, setPhoto] = useState(false)
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	const handleFileChange = (e) => {
		if (!e.target.files.length) {
			setPhoto(null)
			return
		}
		setPhoto(e.target.files[0])
		console.log('File changed🔥', e.target.files[0]);
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("The passwords does not match")
		}

		setError(null);
		try {
			setLoading(true)

			await signup(emailRef.current.value, passwordRef.current.value, displayNameRef.current.value, photo)

			navigate('/')
			
		} catch (err) {
			setError(err.message)
			setLoading(false)
		}
	}

	return (
		<div className='container-form'>
			{/* {error && <alert </alert> } */}
			<form id='registerForm' onSubmit={handleSubmit}>
				<label className='form-label' htmlFor="name">Namn</label>
				<input id='name' type="text" ref={displayNameRef} required/>

				<label htmlFor="email">Email</label>
				<input id='email' type="email" ref={emailRef} required/>

				<label className='form-label' htmlFor="photo"></label>
				<input type="file" onChange={handleFileChange}/>

				<label className='form-label' htmlFor="password">Lösenord</label>
				<input id='password' type="password" ref={passwordRef} required/>

				<label className='form-label' htmlFor="password">Bekräfta lösenord</label>
				<input id='conformPassword' type="password" ref={passwordConfirmRef} required/>

				<button className='link-btn' disabled={loading} type='submit'>Skapa konto</button>
			</form>
		</div>
	)
}

export default SignupForm