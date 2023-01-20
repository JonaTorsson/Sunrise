import React, { useState, useEffect } from 'react'
import { Alert, Button, Col, Container,  } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import useCoordinates from '../hooks/useCoordinates'
import useForecast from '../hooks/useForecast'
import useLocation from '../hooks/useLocation'
import useDoc from '../hooks/useDoc'
import useModal from '../hooks/useModal'
import useStations from '../hooks/useStations'
import LeafMap from '../components/map/LeafMap'
import LocationTable from '../components/LocationTable'
import { parseToCoordinates } from '../helpers'
import CustomModal from '../components/Modal/CustomModal'
import TempChart from '../components/TempChart'
import PlaceImage from '../components/PlaceImage'
import PlaceholderImage from '../components/Dropzone/PlaceholderImage'

const WeatherStatusPage = () => {
	const { lat, lon: lng, locationId } = useParams()

	const { createLocation, locationQuery, feedback } = useLocation(locationId)

	const stations = useStations()
	const { show, openModal, closeModal } = useModal()
	console.log(openModal);

	const allowImgRequest = locationId ? false : true
	const img = useDoc(locationId, undefined, allowImgRequest)

	const [ coords, setCoords ] = useState(null)

	useEffect(() => {
		const parsedToCoords = parseToCoordinates({ lat, lng })

		setCoords(parsedToCoords)
	}, [])

	const handleClose = async (values, isCanceld) => {
		if (isCanceld) {
			closeModal()
			return
		}

		const { locationName, tempUnit, locationId } = values
		const locationToSave = {
			coords,
			locationName,
			tempUnit,
			locationId
		}

		await createLocation(locationToSave)

		closeModal()
	}

	const weatherData = useCoordinates(coords)
	const forecast = useForecast(coords)

  return (
	<Container>
		{ weatherData.isError || 
			(
				forecast.isError && 
				<p>
					Inget väder här inte nä!
				</p>
			)
		}

		<Col>
		{weatherData.data && locationQuery.data && stations.data && (
			<LocationTable 
				locationData={
					locationQuery.data.length === 1 && locationId
					? locationQuery.data
					: undefined
				}
				weatherData={weatherData.data}
				stations={stations.data}
			/>
		)}
		</Col>
		{feedback && (
			<Alert severity={feedback.type}>
				{feedback.msg}
			</Alert>
		)}
		<Col xs={12} md={10}>
			{img && img?.docs.length > 0 ? (
				<PlaceImage docs={img.docs}/>
			) : (
				<PlaceholderImage locationId={locationId}/>
			)
			}
		</Col>

		<Col>
			{coords && (
				<LeafMap 
					onLocationPage
					coords={coords}
					locationId={locationId}
					height={{ height: "300px" }}
				/>
			)}
		</Col>

		{!locationId && (
			<Button
			onClick={openModal}>
				Spara platsen
			</Button>
		)}

		{forecast.data && 
			<TempChart 
				forecastData={forecast.data.daily} 
			/>
		}

		{weatherData.data && (
			<CustomModal 
				text='save'
				spotName={weatherData.data.name}
				show={show}
				handleClose={handleClose}
			/>
		)}
	</Container>
  )
}

export default WeatherStatusPage