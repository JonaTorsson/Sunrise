import React, { useState } from 'react'
import { Col, Alert, Container, Row } from 'react-bootstrap'
import FavoritesCard from './FavoritesCard'
import DeleteModal from '../Modal/DeleteModal'
import useLocation from '../../hooks/useLocation'
import useCollection from '../../hooks/useCollection'

const FavoritesWrapper = () => {
	const [locationToBeDeleted, setLocationToBeDeleted] = useState()
	const [show, setShow] = useState(false)

	const favorites = useLocation()
	const collection = useCollection()

	const handleDeleteClick = (action) => {
		if (!action) {
			setShow(false)
			setLocationToBeDeleted()
			return
		}
		collection.deleteLocation(locationToBeDeleted)

		setShow(false)
		setLocationToBeDeleted()
	}

	const openModal = (id, img, name) => {
		setLocationToBeDeleted({
			id, img, name
		})
		setShow(true)
	}


	return (
		<>
			<Container>
				{favorites.feedback && (
					<Alert>
						{favorites.feedback.type}
					</Alert>
				)}
				<Col>
					{favorites.locationQuery.data &&
						favorites.locationQuery.data.length < 1 && (
							<Alert severity="info">
								Det finns inga favoriter här än.
							</Alert>
						)
					}
					<Row>
						{favorites.locationQuery.data &&
							favorites.locationQuery.data.length > 0 &&
							favorites.locationQuery.data.map((item) => (
								<Col key={item._id} >
									<FavoritesCard 
										deleteClick={openModal}
									/>
								</Col>
							))}
					</Row>
				</Col>
				<DeleteModal 
					show={show}
					id={locationToBeDeleted?.id}
					name={locationToBeDeleted?.name}
					handleClose={handleDeleteClick}
					handleDelete={handleDeleteClick}
				/>
			</Container>
		</>
	)
}

export default FavoritesWrapper