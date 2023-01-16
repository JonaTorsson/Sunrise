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
	const [ userName, setUserName ] = useState(null)
	const [ userEmail, setUserEmail]  = useState(null)
	const [ userPhotoUrl, setUserPhotoUrl ] = useState(null)
	const [ loading, setLoading ] = useState(true)

	const signup = async ( email, password, name, photo ) => {
		await createUserWithEmailAndPassword(auth, email, password)

		await setDisplayNameAndPhoto(name, photo)

		await reloadUser()

		const docRef = doc(db, 'users', auth.currentUser.uid)
		await setDoc(docRef, {
			name,
			email,
			photoURL: auth.currentUser.photoURL,
		})
	}

	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const logout = () => {
		return signOut(auth)
	}

	const reloadUser = async () => {
		await auth.currentUser.reload()
		setCurrentUser(auth.currentUser)
		setUserName(auth.currentUser.displayName)
		setUserEmail(auth.currentUser.email)
		setUserPhotoUrl(auth.currentUser.photoURL)
		return true
	}

	const setDisplayNameAndPhoto = async (displayName, photo) => {
		let photoURL = auth.currentUser.photoURL

		if (photo) {
			const fileRef = ref(storage, `photos/${auth.currentUser.email}/${photo.name}`)

			try {
				const uploadResult = await uploadBytes(fileRef, photo)

				photoURL = await getDownloadURL(uploadResult.ref)

				console.log("Photo uploaded successfully, download url is:", photoURL)

			} catch (e) {
				console.log("Upload failed", e)
				setError("Photo failed to upload!")
			}
		}	

		return updateProfile(auth.currentUser, {
			displayName,
			photoURL,
		})
	}

	useEffect(() => {
		// listen for auth-state changes
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user)
			setUserName(user?.displayName)
			setUserEmail(user?.email)
			setUserPhotoUrl(user?.photoURL)
			setLoading(false)
		})

		return unsubscribe
	}, [])

	const contextValues = {
		signup,
		currentUser,
		login,
		logout,
		reloadUser,
		setDisplayNameAndPhoto,
		userEmail,
		userName,
		userPhotoUrl,
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