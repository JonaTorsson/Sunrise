import React from 'react'
import { Card } from 'react-bootstrap'

const FavoritesImage = ({ data, finishedLodaing }) => {
	const src = data[0]?.data()

	return src ? (
		<Card.Img
			alt='Badplats'
			image={src.url}
			onLoad={() => finishedLodaing(src)}
		>

		</Card.Img>
	) : (<p>Ingen bild här</p>)
}

export default FavoritesImage