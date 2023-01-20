import React from 'react'
import Dropzone from '../Dropzone/Dropzone'
import { Modal, Button, Alert } from 'react-bootstrap'

const UploadImgModal = ({ show, text, handleClose, locationId, fileUploader }) => {
	return (
		<Modal show={show} onClose={handleClose}>
			{fileUploader.message && (
				<Alert>
					{fileUploader.message.msg}
				</Alert>
			)}
			<Modal.Header>
				<Modal.Title>
					{text}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Dropzone fileUploader={fileUploader} locationId={locationId} />
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={handleClose}>Stäng</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default UploadImgModal