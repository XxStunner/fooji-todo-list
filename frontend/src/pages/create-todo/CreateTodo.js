import { useTodoLists } from '../../hooks/useTodoLists'
import { useTodos } from '../../hooks/useTodos'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import { useState } from 'react'
import Arrow from '../../components/icons/Arrow'

export default function CreateTodo() {
	const { todoLists } = useTodoLists()
	const { createTodo } = useTodos()
	const navigate = useNavigate()
	const [todoTitle, setTodoTitle] = useState('')
	const [todoListId, setTodoListId] = useState(todoLists.rows.length ? todoLists.rows[0] : 0)

	const handleCreateTodoForm = async event => {
		event.preventDefault()

		await createTodo({
			title: todoTitle,
			todoListId: Number(todoListId),
		})

		navigate('/')
	}

	return (
		<div className="p-8">
			<div className="flex justify-between mb-4 items-center">
				<h2 className="font-bold text-xl">Create a todo</h2>
			</div>
			<form onSubmit={handleCreateTodoForm}>
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
				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2">Todo list</label>
					<div className="inline-block relative w-full">
						<select
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							onChange={event => setTodoListId(event.target.value)}
							required
						>
							<option value="">Select a todo list</option>
							{todoLists.rows.map(todoList => (
								<option key={todoList.id} value={todoList.id}>
									{todoList.title}
								</option>
							))}
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
							<Arrow />
						</div>
					</div>
				</div>
				<Button title="Create todo" type="submit" />
			</form>
		</div>
	)
}
