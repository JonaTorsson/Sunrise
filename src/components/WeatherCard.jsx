import React from 'react'

// --- HOOKS ---
import useWaterTemp from '../hooks/useWaterTemp'
import { parseTime } from '../helpers'

const WeatherCard = ({ weatherData, stationId, locationName }) => {

	const { name, sys, wind, main } = weatherData

	const waterTemp = useWaterTemp(stationId)

	return (
	<div>
		<div className="card">
			<div className="card-body">
				<h5 className="card-title" id="location">
					<span id="city">Vald plats: {locationName ? locationName : name}</span>
				</h5>
				<p className="temp">
					<span id="temperature">Temperatur: {`${main.temp}`}</span>
					&deg;C
				</p>
				{waterTemp.data && (
					<p className="water-temp">
						<span id="waterTemperature">Vattentemperatur: {`${waterTemp.data.tempValue}${waterTemp.data.tempUnit}`}</span>
					</p>
				)}
				<p className="sunrise">
					<span id="sunrise-icon">Soluppgång: {parseTime(sys.sunrise)}</span>
				</p>
				<p className="sunset">
					<span id="sunset-icon">Solnedgång: {parseTime(sys.sunset)}</span>
				</p>
				<p className="wind">
					<span id="windspeed">Vindhastighet: {wind.speed}</span> m/s
				</p>
				</div>
			</div>
		</div>
	)
}

export default WeatherCard