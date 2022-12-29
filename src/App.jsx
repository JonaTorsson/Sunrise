import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import './assets/scss/App.scss'
import SearchPage from './pages/SearchPage'

function App() {
	return (
		<div id="App">
			<Navigation />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="signup" element={<SignupPage />} />
				<Route path="login" element={<LoginPage />} />
				<Route path='search' element={<SearchPage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	)
}

export default App
