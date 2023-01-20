import React, { useState, useEffect } from 'react'
import { Line, LineChart, YAxis, XAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts'
import { Col } from 'react-bootstrap'
import { parseForecast } from '../helpers'

const TempChart = ({ forecastData }) => {
	const [ chartData, setChartData ] = useState(null)

	useEffect(() => {
		const parsedForecastData = parseForecast(forecastData)

		setChartData(parsedForecastData)
	}, [])

	return (
		<Col xs={12} md={10}
			style={{
				height: "400px",
				width: "100%"
			}}
		>
			{ chartData && (
				<ResponsiveContainer width='100%' height='100%'>
					<LineChart data={chartData}>
						<CartesianGrid strokeDasharray='3 3'/>
						<XAxis dataKey='day'/>
						<YAxis />
						<Legend />
						<Line 
							dataKey='temp'
							fill='#193f37'
							type='monotone'
						></Line>
					</LineChart>
				</ResponsiveContainer>
			) }
		</Col>
	)
}

export default TempChart