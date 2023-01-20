import React, { useEffect } from 'react'
import { Card, Col, ListGroup, Row } from 'react-bootstrap'
import { parseTime } from '../../helpers'
import { useFavoritesContext } from '../../contexts/FavoritesContext'

const WeathersContent = ({ data, locationName, setItsOn, itsOn, outsideTemp }) => {
	const { updateCounter } = useFavoritesContext()
	const { sys, main } = data

	// useEffect(() => {
	// 	if (itsOn) {
	// 		updateCounter(true)
	// 	}
	// }, [itsOn])

	// const checkCondition = (currentCondition) => {
	// 	const { temp } = currentCondition
	// 	const tempIsGood = checkTemp(temp, outsideTemp)

	// 	if (tempIsGood) {
	// 		if (!itsOn) {
	// 			setItsOn(true)
	// 		}
	// 	}
	// }

	// useEffect(() => {
	// 	checkCondition(wind)
	// }, [outsideTemp])

	return (
		<Row>
			<Card>
				<Card.Title>{locationName}</Card.Title>
				<ListGroup>
					<ListGroup.Item>
						{parseTime(sys.sunrise)}
					</ListGroup.Item>
					<ListGroup.Item>
						{parseTime(sys.sunset)}
					</ListGroup.Item>
					<ListGroup.Item>
						{main.temp}
					</ListGroup.Item>
				</ListGroup>
			</Card>
		</Row>
	)
}

export default WeathersContent