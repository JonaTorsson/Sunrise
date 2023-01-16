import  API_SERVICE  from "./API_SERVICE"

const weatherApiKey = import.meta.env.VITE_OPEN_WEATHER_MAP_KEY

const API = API_SERVICE("https://api.openweathermap.org/data/2.5")

const getLocationWeather = async (coordinates = null) => {
	if (!coordinates) return

	const { lat, lng } = coordinates

	const { data } = await API.get(
		`/weather?units=metric&lat=${lat}&lon=${lng}&appid=${weatherApiKey}`
	)
	return data
}

const getForecast = async (coordinates = null) => {
	if (!coordinates) return

	const { lat, lng } = coordinates;

	const { data } = await API.get(
		`/onecall?units=metric&lat=${lat}&lon=${lng}&exclude=current,minutely,hourly,alerts&appid=${weatherApiKey}`
	)
	return data

	}

const getCoordinates = async (location) => {
	if (!location) return

	const { data } = await API.get(
		`/geo/1.0/direct?q=${location},SE&limit=1&appid=${weatherApiKey}`
	)

	return data[0]
}

export {
	getLocationWeather,
	getForecast,
	getCoordinates
}