import {Container, Navbar, Nav, NavDropdown, Image} from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const Navigation = () => {
	const { currentUser, userName, userEmail, userPhotoUrl } = useAuthContext()
	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/">
					<img
						src="/src/assets/images/logo.svg"
						width="30"
						height="30"
						className="d-inline-block align-top"
						alt="Sunshine-logo"
					/>{' '}
					Sunshine
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto align-items-center">
						{
							currentUser ? (
								<>
									{/* User is logged in */}
									<Nav.Link as={NavLink} end to="/">Home</Nav.Link>
									<Nav.Link as={NavLink} to="/map">Map</Nav.Link>

									<NavDropdown title={
										userPhotoUrl
											? <Image
												src={userPhotoUrl}
												height={30}
												width={30}
												fluid
												roundedCircle
											  />
											: userName || userEmail
									}>
										<NavLink to="update-profile" className="dropdown-item">Update Profile</NavLink>
										<NavLink to="profile" className="dropdown-item">Mina sidor</NavLink>
										<NavDropdown.Divider />
										<NavLink to="logout" className="dropdown-item">Log Out</NavLink>
									</NavDropdown>
								</>
							) : (
								<>
									{/* No user is logged in */}
									<Nav.Link as={NavLink} to="/login">Login</Nav.Link>
									<Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
								</>
							)
						}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
