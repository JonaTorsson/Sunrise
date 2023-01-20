import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { useAuthContext } from '../contexts/AuthContext'
import { collection, addDoc, serverTimestamp, query, where, doc } from 'firebase/firestore'

const useLocation = (locationId = null) => {
	const { currentUser } = useAuthContext()
	const [ feedback, setFeedback ] = useState()
	const navigate = useNavigate()

	useEffect(() => {
		if (feedback) {
			setTimeout(() => setFeedback(), 3000)
		}
	}, [feedback])

	const savedLocationsColRef = collection(db, 'savedLocations')

	const queryKey = !locationId
	? ['savedLocations', currentUser.uid]
	: ['savedLocation', locationId]

	const queryRef = !locationId
	? query(savedLocationsColRef, where('owner', '==', currentUser.uid))
	: query(savedLocationsColRef, where('locationId', '==', locationId))

	const locationQuery = useFirestoreQueryData(
		queryKey,
		queryRef,
		{
			idField: "_id",
			subscribe: true
		},
		{
			refetchOnMount: "always"
		}
	)

	const createLocation = async (locationValues = null, isOnBoarding) => {
		if (!locationValues) return

		const { coords, locationName, locationId, temp } = locationValues

		try {
			await addDoc(savedLocationsColRef, {
				locationId,
				coordinates: {
					lng: coords.lng,
					lat: coords.lat
				},
				locationName,
				created: serverTimestamp(),
				owner: currentUser.uid,
				// outsideTemp: temp
			})

			console.log("doc created");

			if (!isOnBoarding) {
				navigate("/")
			}
		} catch (error) {
			console.log("Error", error.message);
			setFeedback({
				type: "Varning",
				msg: "Platsen kunde inte sparas."
			})
		}
	}

	return { locationQuery, createLocation, feedback }
}

export default useLocation