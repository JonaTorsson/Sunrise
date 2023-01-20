import { useQuery } from "react-query"
import { getLocationWeather } from "../services/owmAPI"
const useCoordinates = (coordinates) => {
	const weatherData = useQuery(["coordinates", coordinates], () =>
		getLocationWeather(coordinates)
	)

	return weatherData
}

export default useCoordinates