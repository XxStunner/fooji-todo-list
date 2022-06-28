export function Button({ title, ...props }) {
	return (
		<button
			className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			type="button"
			{...props}
		>
			{title}
		</button>
	)
}
