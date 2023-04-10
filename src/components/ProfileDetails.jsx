import React from 'react'
import useDoc from '../hooks/useDoc'
import { Image } from 'react-bootstrap'
import UserProfileImage from './UserProfileImage'

const ProfileDetails = ({ currentUser }) => {
	const image = useDoc(null, currentUser.uid)
	return (
		<>
			{image?.docs === undefined ? (
				<Image 
					src="https://via.placeholder.com/50"
					fluid
					roundedCircle
					width="30"
					height="30"
				/>
			) : (
				<div>
					{image && image?.docs.length > 0 ? (
						<UserProfileImage docs={image.docs}/>
					) : (
						<Image 
							src='https://images.unsplash.com/photo-1681114423407-0ff133035f15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2844&q=80'
							fluid
							roundedCircle
							width="30"
							height="30"
						/>
					)}
					<p>
						{currentUser.displayName ? currentUser.displayName : currentUser?.email}
					</p>
				</div>
			)}
		</>
	)
}

export default ProfileDetails