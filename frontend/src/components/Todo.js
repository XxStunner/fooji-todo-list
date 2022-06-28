import { useState } from 'react'
import { useTodos } from '../hooks/useTodos'
import { Check } from './icons/Check'
import { Pencil } from './icons/Pencil'
import { Trash } from './icons/Trash'

export function Todo({ todo, onDeleteTodo = () => {} }) {
	const [isEditingTodo, setIsEditingTodo] = useState(false)
	const { deleteTodo, editTodo } = useTodos()
	const [todoTitle, setTodoTitle] = useState(todo.title)
	const [todoDone, setTodoDone] = useState(todo.done)

	const handleDeleteTodo = async () => {
		await deleteTodo(todo.id)

		onDeleteTodo(todo.id)
	}

	const handleSetDoneTodo = () => {
		setTodoDone(!todoDone)

		editTodo({
			...todo,
			done: todoDone,
		})
	}

	const handleEditTodo = async () => {
		if (!isEditingTodo) {
			return setIsEditingTodo(true)
		}

		await editTodo({
			...todo,
			title: todoTitle,
		})

		setIsEditingTodo(false)
	}

	const handleKeyEnter = event => {
		if (event.code.toLowerCase() === 'enter') {
			handleEditTodo()
		}
	}

	return (
		<li className="font-bold text-sm text-white" key={todo.id}>
			<div
				className={`flex items-center gap-2 p-2 rounded-t justify-between ${
					todoDone ? 'bg-green-600' : 'bg-blue-600'
				}`}
			>
				<div>
					{isEditingTodo ? (
						<input
							className="text-gray-500"
							value={todoTitle}
							onChange={event => setTodoTitle(event.target.value)}
							onKeyDown={handleKeyEnter}
						/>
					) : (
						todoTitle
					)}
				</div>
				<button className="text-white" type="submit" onClick={handleEditTodo}>
					<Pencil />
				</button>
			</div>
			<div>
				<button
					className="inline-flex p-1 justify-center text-white bg-green-600 rounded-bl w-2/4"
					type="button"
					onClick={handleSetDoneTodo}
				>
					<Check />
				</button>
				<button
					className="inline-flex p-1 justify-center text-white bg-red-600 rounded-br w-2/4"
					type="button"
					onClick={handleDeleteTodo}
				>
					<Trash />
				</button>
			</div>
		</li>
	)
}
