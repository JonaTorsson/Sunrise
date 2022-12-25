import axios from "axios"

const axios = (baseURL) => 
	axios.create({
		baseURL
	})

export default axios