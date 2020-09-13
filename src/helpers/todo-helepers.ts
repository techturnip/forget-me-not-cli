import cli from 'cli-ux'
import {greenBright} from 'chalk'

export function addTodo(todo: {name: string; desc: string; date: string}, fmnrc: {name: string; desc: string; vers: string; todos: object[]}) {
  const {todos} = fmnrc
  if (todo && todos) {
    todos.push(todo)
    return fmnrc
  }
  return new Error('something went wrong adding todo')
}

export function todoTable(todos: {name: string; desc: string; date: string}[], flags: import('cli-ux/lib/styled/table').table.Options | undefined, logger: (arg0: any) => any) {
  const sortedTodos = todos.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))

  return cli.table(sortedTodos, {
    name: {
      header: 'Name',
    },
    desc: {
      header: 'Description',
    },
    date: {
      header: 'Date',
    },
  }, {
    printLine: string => logger((greenBright(string))), // uses chalk to style strings
    ...flags,
  })
}
