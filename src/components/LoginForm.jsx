import React from 'react'

import useLoginUser from '../hooks/useLoginUser'
import useForm from '../hooks/useForm'
import { Alert } from 'react-bootstrap'

const LoginForm = () => {
	const [ values, handleChange ] = useForm({
		email: "",
		password: ""
	})

	const { signIn, isLoading, message } = useLoginUser()

	const handleSubmit = async (e) => {
		e.preventDefault()
		
		signIn(values)
	}
	return (
		<>
			{message && (
				<Alert severety={message.type}>
					{message.msg}
				</Alert>
			)}
			<div className='container-form'>
				<form id='registerForm' onSubmit={handleSubmit}>

					<label htmlFor="email">Epost</label>
					<input name='email' id='email' type="email" onChange={handleChange} value={values.email} required/>

					<label className='form-label' htmlFor="password">Lösenord</label>
					<input name='password' id='password' type="password" onChange={handleChange} value={values.password} required/>

					<button className='link-btn' disabled={isLoading} type='submit'>Logga in</button>
				</form>
			</div>
		</>
	)
}

export default LoginForm