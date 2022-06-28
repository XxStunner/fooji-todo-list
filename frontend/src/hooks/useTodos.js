import { useState, useEffect } from 'react'
import { api } from './useAxios'

export const useTodos = () => {
	const [todos, setTodos] = useState({
		count: 0,
		rows: [],
	})

	useEffect(() => {
		api.get('todos').then(({ data }) => {
			setTodos(data)
		})
	}, [])

	const createTodo = todoListData => {
		return api.post('todos', todoListData)
	}

	const editTodo = todo => {
		return api.put(`todos/${todo.id}`, todo)
	}

	const deleteTodo = todoId => {
		return api.delete(`todos/${todoId}`)
	}

	return {
		todos,
		setTodos,
		createTodo,
		editTodo,
		deleteTodo,
	}
}
