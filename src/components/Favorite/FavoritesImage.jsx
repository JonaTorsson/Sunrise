import React from 'react'
import { Card } from 'react-bootstrap'

const FavoritesImage = ({ data, finishedLodaing }) => {
	const image = data[0]?.data()

	return image ? (
		<Card.Img
			alt='Badplats'
			src={image.url}
			onLoad={() => finishedLodaing(image)}
		>
		</Card.Img>
	) : (
		<p>Ingen bild här</p>
	)
}

export default FavoritesImage