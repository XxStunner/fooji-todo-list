import { useTodoLists } from '../../hooks/useTodoLists'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import { useState } from 'react'

export default function CreateTodoList() {
	const { createTodoList } = useTodoLists()
	const navigate = useNavigate()
	const [todoTitle, setTodoTitle] = useState('')

	const handleCreateTodoListForm = async event => {
		event.preventDefault()

		await createTodoList({
			title: todoTitle,
		})

		navigate('/')
	}

	return (
		<div className="p-8">
			<div className="flex justify-between mb-4 items-center">
				<h2 className="font-bold text-xl">Create a todo list</h2>
			</div>
			<form onSubmit={handleCreateTodoListForm}>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						type="text"
						placeholder="Title"
						onChange={event => setTodoTitle(event.target.value)}
						value={todoTitle}
						required
					/>
				</div>
				<Button title="Create todo list" type="submit" />
			</form>
		</div>
	)
}
