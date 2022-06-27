import { Route, Routes } from 'react-router-dom'
import { RequireAuth } from './middlewares/requireAuth'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import { AuthProvider } from './providers/AuthProvider'

function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route
					path="/"
					element={
						<RequireAuth>
							<Home />
						</RequireAuth>
					}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</AuthProvider>
	)
}

export default App
