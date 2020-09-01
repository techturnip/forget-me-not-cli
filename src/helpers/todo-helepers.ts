export function addTodo(todo: {name: string; desc: string; date: string}, fmnrc: {name: string; desc: string; vers: string; todos: object[]}) {
  const {todos} = fmnrc
  if (todo && todos) {
    todos.push(todo)

    return fmnrc
  }
  return new Error('something went wrong adding todo')
}
