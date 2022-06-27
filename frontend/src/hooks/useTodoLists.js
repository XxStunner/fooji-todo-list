import { useState, useEffect } from 'react'
import axios from 'axios'

export const useUser = () => {
	const [user, setUser] = useState(null)

	useEffect(() => {
		axios.get('http://localhost:5000/todo-lists').then(({ data }) => {
			console.log(data)
		})
	}, [])

	return {
		user,
		setUser,
	}
}
