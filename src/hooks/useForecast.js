import { useQuery } from "react-query"
import { getForecast } from "../services/owmAPI"
const useForecast = (coordinates) => {
	const weatherData = useQuery(["forecast", coordinates], () =>
		getForecast(coordinates)
	)

	return weatherData
}

export default useForecast