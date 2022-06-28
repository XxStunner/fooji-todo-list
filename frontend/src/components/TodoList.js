import { Todo } from './Todo'

export function TodoList({ todoList, onDeleteTodo = () => {} }) {
	return (
		<div className="flex gap-2 flex-col" key={todoList.id}>
			<h3 className="text-lg font-bold">{todoList.title}</h3>
			<ul className="flex gap-2 flex-col">
				{todoList.todos.map(todo => (
					<Todo key={todo.id} todo={todo} onDeleteTodo={onDeleteTodo} />
				))}
			</ul>
		</div>
	)
}
