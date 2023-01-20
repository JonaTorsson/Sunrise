import React, { useState, useEffect } from 'react'
import { NavLink, NavLink as RouterLink } from 'react-router-dom'
import { Icon } from 'leaflet'
import { useMapEvent, Marker, Popup } from 'react-leaflet'
import markerIconPng from 'leaflet/dist/images/marker-icon.png'
import useCoordinates from '../../hooks/useCoordinates'
import useWaterTemp from '../../hooks/useWaterTemp'
import { calcNearest } from '../../helpers/DistancCalc'
import { parseToUrl } from '../../helpers'

const LocationMark = ({ currentPosition, onLocationPage, stations }) => {
	const [ position, setPosition ] = useState(currentPosition)
	const [ coordURL, setCoordURL ] = useState(parseToUrl(currentPosition))
	const [ station, setStation ] = useState(null)
	const waterTemp = useWaterTemp(station)

	useEffect(() => {
		if (position) {
			const result = calcNearest(stations, position)

			setStation(result.id)
		}
	}, [position])

	const weatherData = useCoordinates(position)

	useMapEvent({
		click(e) {
			if (!onLocationPage) {
				setPosition(e.latlng)
				setCoordURL(parseToUrl(e.latlng))
			} else {
				console.log("location not found! 😞");
			}
		}
	})

	const showWeahterData = (geo, water) => {
		const { tempValue, tempUnit } = water
		let content

		if (geo.sys.country !== "SE")
			return (content = <p>Den här tjänsten är bara tillgänglig i Sweden 😳</p>)

			content = (
				<>
					<p>{geo.name}</p>
					<p>
						Utomhus temp: {geo.main.temp}&deg;C
					</p>
					<p>
						Vatten temp: { tempValue }
						{ tempUnit }
					</p>
					<div 
						style=
							{{
								display: "flex",
								alignItems: "center"
							}}
					>
					</div>
					
					{ coordURL && (
						<NavLink to={`${coordURL.lng}/${coordURL.lat}`} >
							Läs mer
						</NavLink>
					) }
				</>
			)
			return content
	}

	return position === null ? null : (
		<Marker
			icon = {
				new Icon({
					iconUrl: markerIconPng,
					iconSize: [20, 33],
					iconAnchor: [12, 35]
				})
			}
			position={position}
		>
			<Popup>
				{(weatherData.isLoading || waterTemp.isLoading) && <p>Laddar data🔥</p>}
				{weatherData.isError || (waterTemp.isError && <p>Ingen info hittades🚨</p>)}
				{weatherData.data && 
					waterTemp.data && 
					showWeahterData(weatherData.data, waterTemp.data)
				}
			</Popup>
		</Marker>
	)
}

export default LocationMark