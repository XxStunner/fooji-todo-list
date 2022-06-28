import { api } from './useAxios'

export const useTodoLists = () => {
	const getTodoLists = (offset, limit = 10) => {
		return api.get(`todo-lists?offset=${offset}&limit=${limit}`).then(({ data }) => data)
	}

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
		getTodoLists,
		createTodoList,
		editTodoList,
		deleteTodoList,
	}
}
