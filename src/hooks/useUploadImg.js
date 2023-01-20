import { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from '../firebase'
import { v4 as uuidv4 } from 'uuid'
import { collection, addDoc } from "firebase/firestore";
import { useAuthContext } from "../contexts/AuthContext";

const useUploadImg = () => {
	const [ message, setMessage ] = useState(null)
	const [ progress, setProgress ] = useState(0)
	const { currentUser } = useAuthContext()

	const upload = (image = null, locationId) => {
		if (!image) return

		setProgress()

		const uuid = uuidv4()

		const ext = image.name.substring(image.name.lastIndexOf('.') + 1)
		const fileRef = ref(storage, `images/${uuid}.${ext}`)
		console.log('file ref', fileRef);

		const fileUploadTask = uploadBytesResumable(fileRef, image)

		fileUploadTask.on(
			'state_changed',
			(snapshot) => {
				const result = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
				setProgress(result)
			},
			(error) => {
				console.log(error);
				setMessage({
					type: 'WARNING',
					msg: `Bild failade pågrund av: ${error}`
				})
			},
			async () => {
				const url = await getDownloadURL(fileRef)
				const collectionRef = collection(db, 'images')

				const uploadDocumentModel = locationId
					? {
						locationId,
						name: image.name,
						path: fileRef.fullPath,
						size: image.size,
						type: image.type,
						owner: currentUser.uid,
						ext,
						url,
						uuid,
					} : {
						profileImageId: currentUser.uid,
						name: image.name,
						path: fileRef.fullPath,
						size: image.size,
						type: image.type,
						owner: currentUser.uid,
						ext,
						url,
						uuid,
					};
				try {
					await addDoc(collectionRef, uploadDocumentModel);
					setMessage({
						type: "success",
						msg: "Gratulerar, filen är uppladdad och startklar!",
					});
				} catch (error) {
					console.log({ error });
				}
			}
		)
	}
	return {
		upload,
		message,
		progress
	}
}

export default useUploadImg