import { v4 as uuidv4 } from 'uuid'
import React, { useState } from 'react'
import { Modal, Col, Button, Form,  } from 'react-bootstrap'

const CustomModal = ({ show, handleClose, currentLocationId, spotName, text }) => {

	const [ locationName, setLocationName ] = useState(spotName ? spotName : '')
	const [ locationId ] = useState(currentLocationId ? currentLocationId : uuidv4)

	const handleInputChange = (event) => setLocationName(event.target.value)

	const submitValues = () => {
		const values = {
			locationName,
			locationId
		}
		handleClose(values)
	}

	return (
		<div>
			<Modal show={show} onClose={handleClose}>
				<Modal.Header>
					<Modal.Title>
						{text} platsen som favorit!
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Fyll i fältet</p>
				</Modal.Body>
				<Col>
					<Form.Control value={locationName} placeholder='Fyll i platsens namn' type='text' onChange={(e) => handleInputChange(e)}/>
				</Col>

				<Button onClick={() => handleClose(undefined, true)}>Avbryt</Button>
				<Button onClick={submitValues}>Spara</Button>
			</Modal>
		</div>
	)
}

export default CustomModal