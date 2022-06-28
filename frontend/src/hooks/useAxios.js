import axios from 'axios'

export const api = axios.create({
	baseURL: process.env.REACT_APP_API || 'http://localhost:5000',
	proxy: true,
	withCredentials: true,
})
