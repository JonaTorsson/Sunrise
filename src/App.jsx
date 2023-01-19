import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import './assets/scss/App.scss'
import MapPage from './pages/MapPage'
import LogoutPage from './pages/LogoutPage'
import UpdateProfilePage from './pages/UpdateProfilePage'
import WeatherStatusPage from './pages/WeatherStatusPage'
import RequireAuth from './components/RequireAuth'
import ProfilePage from './pages/ProfilePage'


function App() {
	return (
		<div id="App">
			<Navigation />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="signup" element={<SignupPage />} />
				<Route path="login" element={<LoginPage />} />

				<Route path="profile" element={
					<RequireAuth>
						<ProfilePage />
					</RequireAuth>
				} />


				<Route path="update-profile" element={
					<RequireAuth>
						<UpdateProfilePage/>
					</RequireAuth>
				} />
				
				<Route path="logout" element={<LogoutPage />} />

				<Route path='map' element={
					<RequireAuth>
						<MapPage />
					</RequireAuth>
				} />
				<Route path='map/:lon/:lat' element={
					<RequireAuth>
						<WeatherStatusPage />
					</RequireAuth>
				} />
				<Route path='map/:lon/:lat/:locationId' element={
					<RequireAuth>
						<WeatherStatusPage />
					</RequireAuth>
				} />

				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	)
}

export default App
