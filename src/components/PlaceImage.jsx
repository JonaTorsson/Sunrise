import React from 'react'
import { Card } from 'react-bootstrap'

const PlaceImage = ({ docs }) => {
	const src = docs[0].data().url

	return (
		<Card.Img
			sx={{
				margin: "10px 0",
				width: "100%",
				maxHeight: "300px",
				objectFit: "contain"
			}}
			image={src}
		/>
	)
}

export default PlaceImage