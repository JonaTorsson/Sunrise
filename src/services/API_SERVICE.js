import axios from "axios"

const API_SERVICE = (baseURL) => 
	axios.create({
		baseURL
	})

export default API_SERVICE