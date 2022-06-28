import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../hooks/useAxios'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null)
	const [isLoadingForTheFirstTime, setIsLoadingForTheFirstTime] = useState(true)
	const navigate = useNavigate()

	const handleLogin = async loginData => {
		const loggedUser = await api.post('auth/login', loginData).then(({ data }) => data)

		setUser(loggedUser)

		navigate('/')
	}

	const handleRegister = async loginData => {
		const loggedUser = await api.post('auth/register', loginData).then(({ data }) => data)

		setUser(loggedUser)

		navigate('/')
	}

	const handleLogout = () => {
		setUser(null)

		navigate('/login')
	}

	useEffect(() => {
		if (isLoadingForTheFirstTime) {
			api.get('auth/me')
				.then(({ data }) => {
					setUser(data)
					setIsLoadingForTheFirstTime(false)
				})
				.catch(() => setIsLoadingForTheFirstTime(false))
		}
	}, [isLoadingForTheFirstTime])

	const value = {
		user,
		isLoadingForTheFirstTime,
		handleLogin,
		handleRegister,
		handleLogout,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
