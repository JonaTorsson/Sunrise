import { useState } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

const useLoginUser = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [message, setMessage] = useState(null)

	const navigate = useNavigate()

	const { login } = useAuthContext()

	const signIn = async ({email, password}) => {
		setMessage(null)
		try {
		setIsLoading(true)
		
		await login(email, password)

		navigate("/")
	} catch (error) {
		setMessage({
		msg: error.message,
		type: "Varning🚨",
	});
		setIsLoading(false)
	}
}

	return { signIn, isLoading, message }
}

export default useLoginUser
