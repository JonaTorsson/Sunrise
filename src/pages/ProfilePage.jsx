import React from 'react'
import { Col } from 'react-bootstrap'
import FavoritesWrapper from '../components/Favorite/FavoritesWrapper'
// import { useFavoritesContext } from '../contexts/FavoritesContext'

const ProfilePage = () => {
	// const counter  = useFavoritesContext()
	
	return (
		<Col>
			<FavoritesWrapper />
		</Col>
	)
}

export default ProfilePage