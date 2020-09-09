// ==========================================|
// IMPORTS ----------------------------------|
// ==========================================|
import {Command, flags} from '@oclif/command'
import {readFileSync, writeFileSync} from 'fs'
import checkForFile from '../helpers/check-for-files'
import {redBright} from 'chalk'
import {textSync} from 'figlet'
import {addTodo, todoTable} from '../helpers/todo-helepers'
import cli from 'cli-ux'
// ==========================================|
// TODO: ------------------------------------|
// ==========================================|
// Offer cross project functionality, which
// will allow the cli to display latest todos
// across multiple projects, which may require
// some type of global database implementation
// such as SQLite and a DB interaction API
//
// Current focus is building out local todo
// functionality
// ==========================================|
// COMMAND ----------------------------------|
// ==========================================|
export default class Todo extends Command {
  // ----------------------------------------|
  // Command description --------------------|
  // ========================================|
  static description = 'display and manage local project todos'
  // ----------------------------------------|
  // Command flags --------------------------|
  // ========================================|
  static flags = {
    help: flags.help({char: 'h'}),
    list: flags.boolean({char: 'l', description: 'list available todos'}),
    add: flags.boolean({char: 'a', description: 'add a todo to the project'}),
    ...cli.table.flags(),
  }
  // ----------------------------------------|
  // Command args ---------------------------|
  // ========================================|
  // static args = [{name: 'file'}]
  // ----------------------------------------|
  // Run ------------------------------------|
  // ========================================|
  async run() {
    // --------------------------------------|
    // Define Variables ---------------------|
    // ======================================|
    const {/* args,a */flags} = this.parse(Todo)
    const fmnrcPath = './.fmnrc.json'
    const noFmnrc = redBright('No fmnrc was detected!\nEnsure that you are in a project root directory (package.json)\nRun "fmn init" command.')
    const fmnrc = checkForFile(fmnrcPath) ? readFileSync(fmnrcPath).toString() : null
    // --------------------------------------|
    // Todo Command logic -------------------|
    // ======================================|
    // Check for fmnrc file
    if (!fmnrc) return this.warn(noFmnrc)
    // pull out todos array from fmnrc object
    const todos: {name: string; desc: string; date: string}[] = JSON.parse(fmnrc).todos
    // Check for list flag
    if (flags.list && todos.length > 0) {
      // setup table
      todoTable(todos, flags, this.log)
      return // return to avoid additional operations
    }
    if (flags.add) {
      // prompt for todo name/description
      const name = await cli.prompt('What is the name of your todo item?')
      const desc = await cli.prompt('Add a short description of your todo:')
      // create new date stamp for the todo
      const date = new Date().toLocaleString()
      // define new todo object
      const todo = {name, desc, date}
      // create a new fmnrc with added todo
      const newFmnrc = addTodo(todo, JSON.parse(fmnrc))
      // write the new fmnrc data to the fmnrc file
      writeFileSync(fmnrcPath, JSON.stringify(newFmnrc, null, 2))
      return
      // else there were no flags
    }
    // check for fmnrc file
    if (fmnrc) {
      // parse the fmnrc file and destructure data
      const {name, vers, desc} = JSON.parse(fmnrc)
      // use textSync from figlet to display project name,
      // display other project details
      this.log(textSync(name) + ' v' + vers + '\n\n' + (desc ? desc : '') + '\n')
      // display todos in a table format
      todos.length > 0 ? todoTable(todos, flags, this.log) : null
    }
  }
}
