import React from 'react'
import { Button, Modal,  } from 'react-bootstrap'

const DeleteModal = ({ show, handleClose, handleDelete, id, name }) => {
	return (
		<>
			<Modal show={show} onClose={handleClose}>
				<Modal.Title>
					Radera favorit: {name ? name : id}
				</Modal.Title>
				<Button onClick={() => handleClose(false)}>
					Avbryt
				</Button>
				<Button onClick={() => handleDelete(true)}>
					Radera
				</Button>
			</Modal>
		</>
	)
}

export default DeleteModal