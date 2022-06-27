import axios from 'axios'
import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null)
	const navigate = useNavigate()

	const handleLogin = async loginData => {
		const loggedUser = await axios.post('http://localhost:5000/auth/login', loginData).then(({ data }) => data)

		setUser(loggedUser)

		navigate('/')
	}

	const handleRegister = async loginData => {
		const loggedUser = await axios.post('http://localhost:5000/auth/register', loginData).then(({ data }) => data)

		setUser(loggedUser)

		navigate('/')
	}

	const handleLogout = () => {
		setUser(null)

		navigate('/login')
	}

	const value = {
		user,
		handleLogin,
		handleRegister,
		handleLogout,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
