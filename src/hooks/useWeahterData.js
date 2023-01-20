import { useQuery } from "react-query"
import { getLocationWeather } from "../services/owmAPI"
const useWeatherData = (coordinates = null) => {
	const weatherData = useQuery(["favorites", "weather", coordinates], () =>
		getLocationWeather(coordinates)
	)

	return weatherData
}

export default useWeatherData