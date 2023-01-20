const parseTime = (timeInUnix) => {
	const time = new Date(timeInUnix * 1000)

	return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

const parseToUrl = ({ lat, lng }) => {
	return {
		lat: lat.toString().replace(".", "&"),
		lng: lng.toString().replace(".", "&"),
	}
}

const parseToCoordinates = ({ lat, lng }) => {
	return {
		lat: Number(lat.replace("&", ".")),
		lng: Number(lng.replace("&", ".")),
	}
}

const parseForecast = (data = null) => {
	if (!data) return

	return data.map((item) => {
		const options = { month: 'numeric', day: 'numeric' }
		const date = new Date(item.dt * 1000).toLocaleDateString([], options)
		return {
			day: date,
			temp: item.temp.day,
		}
	})
}

export {
	parseTime,
	parseToUrl,
	parseToCoordinates,
	parseForecast
}