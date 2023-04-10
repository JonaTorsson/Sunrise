import React from 'react'
import { Card } from 'react-bootstrap'

const PlaceImage = ({ docs }) => {
	const image = docs[0].data().url

	return (
		<Card.Img
			
			src={image}
		/>
	)
}

export default PlaceImage