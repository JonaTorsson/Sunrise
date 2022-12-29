import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const LoginForm = () => {
	const emailRef = useRef()
	const passwordRef = useRef()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const { login } = useAuthContext()
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError(null)

		try {
			setLoading(true)
			await login(emailRef.current.value, passwordRef.current.value)
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

				<label htmlFor="email">Email</label>
				<input id='email' type="email" ref={emailRef} required/>

				<label className='form-label' htmlFor="password">Lösenord</label>
				<input id='password' type="password" ref={passwordRef} required/>

				<button className='link-btn' disabled={loading} type='submit'>Logga in</button>
			</form>
		</div>
	)
}

export default LoginForm