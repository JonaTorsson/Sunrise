import { v4 as uuidv4 } from 'uuid'
import React, { useState } from 'react'
import { Modal, Col, Button, Form,  } from 'react-bootstrap'

const CustomModal = ({ show, handleClose, currentLocationId, spotName, text, temp }) => {

	const [ locationName, setLocationName ] = useState(spotName ? spotName : '')
	const [ temperature, setTemperature ] = useState(temp ? temp : 20)
	const [ locationId ] = useState(currentLocationId ? currentLocationId : uuidv4)

	const handleInputChange = (event) => setLocationName(event.target.value)
	const handleChange = (event) => setTemperature(event.target.value)

	const submitValues = () => {
		const values = {
			locationName,
			locationId,
			temperature
		}
		handleClose(values)
	}

	return (
		<div>
			<Modal show={show} onClose={handleClose}>
				<Modal.Header>
					<Modal.Title>
						{text} location
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Fyll i alla fält</p>
				</Modal.Body>
				<Col>
					<Form.Control value={locationName} placeholder='Fyll i platsens namn' type='text' onChange={(e) => handleInputChange(e)}/>
					<Form.Control value={temp} placeholder='fyll i temperatur' type='text' onChange={(e) => handleChange(e)}/>
				</Col>

				<Button onClick={() => handleClose(undefined, true)}>Avbryt</Button>
				<Button onClick={submitValues}>Spara</Button>
			</Modal>
		</div>
	)
}

export default CustomModal