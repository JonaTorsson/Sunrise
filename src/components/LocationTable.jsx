import WeatherCard from "./WeatherCard"
import { useState, useEffect } from "react"
import { calcNearest } from "../helpers/DistancCalc"

const LocationTable = ({ weatherData, locationData, stations }) => {
	const { coord } = weatherData
	const [ station, setStation ] = useState(null)

	useEffect(() => {
		const { lat, lon: lng } = coord
		const position = {
			lat,
			lng
		}

		const result = calcNearest(stations, position)

		setStation(result.id)
	}, [])
	return (
		<WeatherCard 
			weatherData={weatherData}
			stationId={station}
			locationName={locationData ? locationData[0].locationName : undefined}
		/>
	)
}

export default LocationTable