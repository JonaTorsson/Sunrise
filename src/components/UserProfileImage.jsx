import React from "react"
import { Image } from "react-bootstrap"

const UserProfileImage = ({ docs }) => {
	const image = docs[0].data().url
	return (
		<Image
			src={image}
			height={30}
			width={30}
			fluid
			roundedCircle
		/>
	)
}

export default UserProfileImage
