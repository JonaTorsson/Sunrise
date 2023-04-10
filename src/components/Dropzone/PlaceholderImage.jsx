import React, { useEffect } from 'react'
import UploadImgModal from '../Modal/UploadImgModal'
import useModal from '../../hooks/useModal'
import useUploadImg from '../../hooks/useUploadImg'
import { useQueryClient } from 'react-query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'react-bootstrap'

const PlaceholderImage = ({ locationId }) => {
	const queryClient = useQueryClient()
	const { show, openModal, closeModal } = useModal()
	const fileUploader = useUploadImg()

	useEffect(() => {
		if (fileUploader.progress) {
			setTimeout(() => {
				closeModal()
				queryClient.invalidateQueries('images')
			}, 3000)
		}
	}, [fileUploader.progress])

	return (
		<>	
			<Button 
				onClick={locationId && openModal} 
			>
				Ladda upp bild
			</Button> 
			<UploadImgModal 
				fileUploader={fileUploader}
				show={show}
				text='image'
				locationId={locationId}
				handleClose={closeModal}
			/>
		</>
	)
}

export default PlaceholderImage