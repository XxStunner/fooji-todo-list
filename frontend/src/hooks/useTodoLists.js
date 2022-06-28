import { useState, useEffect } from 'react'
import { api } from './useAxios'

export const useTodoLists = () => {
	const [todoLists, setTodoLists] = useState({
		count: 0,
		rows: [],
	})

	useEffect(() => {
		api.get('todo-lists').then(({ data }) => {
			setTodoLists(data)
		})
	}, [])

	const createTodoList = todoListData => {
		return api.post('todo-lists', todoListData)
	}

	const editTodoList = todoListData => {
		return api.put(`todo-lists/${todoListData.id}`, todoListData)
	}

	const deleteTodoList = todoListId => {
		return api.delete(`todo-lists/${todoListId}`)
	}

	return {
		todoLists,
		setTodoLists,
		createTodoList,
		editTodoList,
		deleteTodoList,
	}
}
