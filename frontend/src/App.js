import { Route, Routes } from 'react-router-dom'
import { RequireAuth } from './middlewares/requireAuth'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import CreateTodo from './pages/create-todo/CreateTodo'
import CreateTodoList from './pages/create-todo-list/CreateTodoList'
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
				<Route
					path="/create-todo"
					element={
						<RequireAuth>
							<CreateTodo />
						</RequireAuth>
					}
				></Route>
				<Route
					path="/create-todo-list"
					element={
						<RequireAuth>
							<CreateTodoList />
						</RequireAuth>
					}
				></Route>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</AuthProvider>
	)
}

export default App
