import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'
import { useAuth } from '../../hooks/useAuth'

function Register() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const { handleRegister } = useAuth()

	const handleFormSubmit = event => {
		event.preventDefault()

		handleRegister({ username, password })
	}

	return (
		<div className="w-full flex justify-center py-8">
			<div className="w-full max-w-xs">
				<h1 className="font-bold text-xl mb-4">Register in order to use the todoList!</h1>
				<form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleFormSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="username"
							type="text"
							placeholder="Username"
							onChange={event => setUsername(event.target.value)}
							value={username}
							required
						/>
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							id="password"
							type="password"
							placeholder="******"
							onChange={event => setPassword(event.target.value)}
							value={password}
							required
						/>
					</div>
					<div className="flex items-center justify-between">
						<Button title="Register" type="submit" />
						<Link
							className='className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"'
							to="/login"
						>
							Have an account?
						</Link>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Register
