import { useState } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

const useSignupUser = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [message, setMessage] = useState(null)

	const navigate = useNavigate()
	const { signup } = useAuthContext()

	const createUser = async ({ email, password, confirmPassword }) => {
		setMessage(null)
		if (password !== confirmPassword) {
		setMessage("Passwords does not match")
		return
	}

	try {
		setIsLoading(true)

		await signup(email, password)

		navigate("/")
	} catch (error) {
		setMessage(error.message)
		setIsLoading(false)
	}
}

	return { isLoading, createUser, message }
}

export default useSignupUser
