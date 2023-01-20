import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import LocationMark from './LocationMark'
import useStations from '../../hooks/useStations'
import 'leaflet/dist/leaflet.css'

const LeafMap = ({ coords, locationId, height, onLocationPage }) => {

	const [ currentPosition, setCurrentPosition ] = useState(null)

	useEffect(() => {
		if (locationId || coords) {
			setCurrentPosition([ coords.lat, coords.lng ])
		} else {
			navigator.geolocation.getCurrentPosition((pos) => {
				setCurrentPosition([ pos.coords.latitude, pos.coords.longitude ])
			})
		}
	}, [])

	const stations = useStations()

  return (
	<div
		style={{
			margin: { sm: "10px 0", md: "10px 0" },
			flex: 1,
			height: height ? `${height.height}` : "600px",
			width: "100%"
		}}
	>
		{ currentPosition && (
			<MapContainer
				center={currentPosition}
				zoom={7}
				scrollWheelZoom={true}
				style={{
					height: "100%",
					width: "100%"
				}}
			>
				<TileLayer
					maxZoom={19}
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{ stations.data && (
					<LocationMark
						stations={stations.data}
						onLocationPage={onLocationPage}
						currentPosition={{
							lat: currentPosition[0],
							lng: currentPosition[1]
						}}
					/>
				)}
			</MapContainer>
		) }
	</div>
  )
}

export default LeafMap