import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Card, Button, Dropdown } from 'react-bootstrap'
import FavoritesImage from './FavoritesImage'
import WeathersContent from './WeathersContent'
import { parseToUrl } from '../../helpers'
import useCoordinates from '../../hooks/useCoordinates'
import useDoc from '../../hooks/useDoc'

const FavoritesCard = ({ locationName, coordinates, locationId, deleteClick, _id, temp }) => {
	const [ locationImg, setLocationImg ] = useState()
	const [ itsOn, setItsOn ] = useState(false)
	const weatherData = useCoordinates(coordinates)

	const img = useDoc(locationId)

	const navigate = useNavigate()

	const handleClick = () => {
		const url = parseToUrl(coordinates)
		navigate(`/map/${url.lng}/${url.lat}/${locationId}`)
	}

	const finishedLodaing = (src) => setLocationImg(src)

	return (
		<>
			<Card>
				{img && (
					<FavoritesImage data={img.docs} finishedLodaing={finishedLodaing} />
				)}

				<Col>
					{weatherData.data && (
						<WeathersContent 
							data={weatherData.data}
							locationName={locationName}
							setItsOn={setItsOn}
							itsOn={itsOn}
						/>
					)}

					<Button
						onClick={handleClick}
					>
						Gå vidare
					</Button>
				</Col>
					<Dropdown>
						<Dropdown.Item onClick={() => deleteClick(_id, locationImg, locationName)}>
							Radera favorit
						</Dropdown.Item>
					</Dropdown>
			</Card>

		</>
	)
}

export default FavoritesCard