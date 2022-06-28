import { api } from './useAxios'

export const useTodos = () => {
	const getTodos = (offset, limit = 10) => {
		return api.get(`todos?offset=${offset}&limit=${limit}`).then(({ data }) => data)
	}

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
		getTodos,
		createTodo,
		editTodo,
		deleteTodo,
	}
}
