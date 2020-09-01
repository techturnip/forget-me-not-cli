// ==========================================|
// IMPORTS ----------------------------------|
// ==========================================|
import {Command, flags} from '@oclif/command'
import {readFileSync, writeFileSync} from 'fs'
import checkForFile from '../helpers/check-for-files'
import {redBright, yellowBright} from 'chalk'
import {textSync} from 'figlet'
import {addTodo} from '../helpers/todo-helepers'
import cli from 'cli-ux'
// ==========================================|
// COMMAND ----------------------------------|
// ==========================================|
export default class Todo extends Command {
  // ----------------------------------------|
  // Command description --------------------|
  // ========================================|
  static description = 'describe the command here'
  // ----------------------------------------|
  // Command flags --------------------------|
  // ========================================|
  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
    list: flags.boolean({char: 'l', description: 'list available todos'}),
    add: flags.boolean({char: 'a', description: 'add a todo to the project'}),
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
    const {/* args, */flags} = this.parse(Todo)
    const fmnrcPath = './fmnrc.json'
    const noFmnrc = redBright('No fmnrc was detected!\nEnsure that you are in a project root directory (package.json)\nRun "fmn init" command.')
    const fmnrc = checkForFile(fmnrcPath) ? readFileSync(fmnrcPath).toString() : null
    // --------------------------------------|
    // Todo Command logic -------------------|
    // ======================================|
    // Check for list flag
    if (flags.list) {
      // handle list flag logic
      // if no fmnrc, display no fmnrc warning
      if (!fmnrc) return this.warn(noFmnrc)
      return
      // Check for add flag
    }
    if (flags.add) {
      // if no fmnrc, display no fmnrc warning
      if (!fmnrc) return this.warn(noFmnrc)
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
      const {name, vers, desc, todos} = JSON.parse(fmnrc)

      // use textSync from figlet to display project name,
      // log other project details
      this.log(textSync(name) + ' v' + vers + '\n\n' + (desc ? desc : '') + '\n')
      // forEach method on todos list to log information about any available
      // todos
      todos.forEach((todo: {name: string; desc: string; date: string} | undefined) => {
        // if todo is defined
        if (todo) {
          // log information
          this.log(yellowBright(`${todo.date}${'\n'}${todo.name}${'\n'}Todo: ${todo.desc}${'\n\n'}`))
        }
      })
    } else {
      // no fmnrc file found, we post a warning to the console
      this.warn(noFmnrc)
    }
  }
}
