import { Card, ListGroup, Row } from 'react-bootstrap'
import { parseTime } from '../../helpers'

const WeathersContent = ({ data, locationName }) => {
	const { sys, main } = data

	return (
		<Row>
			<Card>
				<Card.Title>{locationName}</Card.Title>
				<ListGroup>
					<ListGroup.Item>
						Soluppgång {parseTime(sys.sunrise)}
					</ListGroup.Item>
					<ListGroup.Item>
						Solnedgång {parseTime(sys.sunset)}
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