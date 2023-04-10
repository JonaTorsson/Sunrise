import React from 'react'
import { Card } from 'react-bootstrap'

const ProfileImage = ({ docs }) => {
	const image = docs[0].data().url

	return (
		<Card.Img 
			alt='Profilbild yeah yeah'
			src='image'
		/>
	)
}

export default ProfileImage