import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'
import { TodoList } from '../../components/TodoList'
import { useTodoLists } from '../../hooks/useTodoLists'
import { useTodos } from '../../hooks/useTodos'

function Home() {
	const [todoLists, setTodoLists] = useState({
		count: 0,
		rows: [],
	})
	const [todos, setTodos] = useState({
		count: 0,
		rows: [],
	})
	const [isGroupedView, setIsGroupedView] = useState(true)
	const [todoListsOffset, setTodoListsOffset] = useState(0)
	const [todosOffset, setTodosOffset] = useState(0)
	const { getTodoLists } = useTodoLists()
	const { getTodos } = useTodos()

	const toggleGroupedView = () => {
		setIsGroupedView(!isGroupedView)
	}

	const handleDeleteTodo = todoId => {
		setTodoLists({
			rows: todoLists.rows.map(todoList => {
				todoList.todos = todoList.todos.filter(todo => todo.id !== todoId)

				return todoList
			}),
			count: todoLists.length - 1,
		})

		setTodos({
			rows: todos.rows.filter(todo => todo.id !== todoId),
			count: todos.length - 1,
		})
	}

	const loadMoreTodoLists = () => {
		setTodoListsOffset(todoLists.rows.length)
	}

	const loadMoreTodos = () => {
		setTodosOffset(todos.rows.length)
		console.log('hello')
	}

	useEffect(() => {
		getTodoLists(todoListsOffset).then((response) => {
			setTodoLists({
				...response,
				rows: [...todoLists.rows, ...response.rows],
			})
		})
	}, [todoListsOffset, setTodoLists])

	useEffect(() => {
		getTodos(todosOffset).then(response => {
			setTodos({
				...response,
				rows: [...todos.rows, ...response.rows],
			})
		})
	}, [todosOffset, setTodos])

	return (
		<div className="p-8">
			<div className="flex justify-between mb-4 items-center">
				<h2 className="font-bold text-xl">Your todo lists</h2>
				<Link
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					to="/create-todo"
				>
					Create a new todo
				</Link>
			</div>
			<div className="flex justify-center gap-4 mb-4">
				<button
					onClick={toggleGroupedView}
					className={
						isGroupedView
							? 'inline-block text-sm py-2 px-4 text-white bg-blue-500 rounded active'
							: 'inline-block text-sm py-3 px-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'
					}
					type="button"
				>
					Grouped View
				</button>
				<button
					onClick={toggleGroupedView}
					className={
						!isGroupedView
							? 'inline-block text-sm py-2 px-4 text-white bg-blue-500 rounded active'
							: 'inline-block text-sm py-3 px-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'
					}
					type="button"
				>
					All todos
				</button>
			</div>
			<div className="gap-4 flex flex-col">
				{isGroupedView && (
					<>
						<Link
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center"
							to="/create-todo-list"
						>
							Create a new list
						</Link>
						{todoLists.rows.map(todoList => (
							<TodoList key={todoList.id} todoList={todoList} onDeleteTodo={handleDeleteTodo} />
						))}
						{todoLists.count > todoLists.rows.length && (
							<Button title="Load More" onClick={loadMoreTodoLists} />
						)}
					</>
				)}
				{!isGroupedView && (
					<>
						<TodoList
							todoList={{
								title: 'All todos',
								todos: todos.rows,
							}}
							onDeleteTodo={handleDeleteTodo}
						/>
						{todos.count > todos.rows.length && <Button title="Load More" onClick={loadMoreTodos} />}
					</>
				)}
			</div>
		</div>
	)
}

export default Home
