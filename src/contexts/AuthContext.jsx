import { createContext, useContext, useEffect, useState } from "react"
import { storage, auth, db } from "../firebase"
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile, 
	onAuthStateChanged,
	signOut
} from 'firebase/auth'
import { doc, setDoc } from "firebase/firestore"
import { ref, getDownloadURL, uploadBytes } from "firebase/storage"
import BeatLoader from "react-spinners/BeatLoader"

const AuthContext = createContext()

const useAuthContext = () => {
	return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
	const [ currentUser, setCurrentUser ] = useState(null)
	const [ loading, setLoading ] = useState(true)

	const signup = async ( email, password ) => {
		return createUserWithEmailAndPassword(auth, email, password)
	}

	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const logout = () => {
		return signOut(auth)
	}

	const setEmail = (newEmail) => {
		return updateEmail(currentUser, newEmail)
	}

	const setPassword = (newPassword) => {
		return updatePassword(currentUser, newPassword)
	}

	const setDisplayName = (name) => {
		return updateProfile(currentUser, {
			displayName: name,
		})
	}

	useEffect(() => {
		// listen for auth-state changes
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user)
			setLoading(false)
		})

		return unsubscribe
	}, [])

	const contextValues = {
		signup,
		currentUser,
		login,
		logout,
		setEmail,
		setPassword,
		loading,
		setLoading
	}

	return (
		<AuthContext.Provider value={contextValues}>
			{loading ? (
				<div id="initial-loader">
					<BeatLoader color={"#888"} size={50} />
				</div>
			) : (
				children
			)}
		</AuthContext.Provider>
	)
}

export {
	AuthContextProvider as default,
	useAuthContext,
}