import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
import useBucket from './useBucket'

const UseCollection = () => {
	const { deleteFromBucket } = useBucket()

	const deleteLocation = async (location) => {
		const { id, img } = location

		try {
			await deleteDoc(doc(db, 'savedLocations', id))

			if (img) {
				await deleteFromBucket(img.path)
			}
		} catch (error) {
			console.log('eerroorr', error.message);
		}
	}
	return { deleteLocation }
}

export default UseCollection