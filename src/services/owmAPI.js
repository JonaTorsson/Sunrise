import { axios } from "./Axios"

const weatherApiKey = import.meta.env.VITE_OPEN_WEATHER_MAP_KEY

const API = axios("https://api.openweathermap.org/data/2.5")

const GetLocationWeather = async (coordinates = null) => {
	if (!coordinates) return

	const { lat, lng } = coordinates

	const { data } = await API.get(
		`/weather?units=metric&lat=${lat}&lon=${lng}&appid=${weatherApiKey}`
	)
	return data
}

const getForecast = async (coordinates = null) => {
	if (!coordinates) return;

	const { lat, lng } = coordinates;

	const { data } = await api.get(
		`/onecall?lat=${lat}&lon=${lng}&exclude=current,minutely,hourly,alerts&appid=${weatherApiKey}`
	);
	return data;

	};

const getCoordinates = async (location) => {
	if (!location) return;

	const { data } = await api.get(
		`/geo/1.0/direct?q=${location},SE&limit=1&appid=${weatherApiKey}`
	);

	return data[0];
};

export {
	GetLocationWeather,
	getForecast,
	getCoordinates
}