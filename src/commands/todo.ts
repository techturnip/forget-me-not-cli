// ==========================================|
// IMPORTS ----------------------------------|
// ==========================================|
import {Command, flags} from '@oclif/command'
import {readFile} from 'fs'
import checkForFile from '../helpers/check-for-files'
import {redBright} from 'chalk'
import {textSync} from 'figlet'
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
  static args = [{name: 'file'}]

  // ----------------------------------------|
  // Run ------------------------------------|
  // ========================================|
  async run() {
    const {args, flags} = this.parse(Todo)
    const fmnrcPath = './fmnrc.json'

    if (flags.list) {
      this.log('list flag')
    }

    if (flags.add) {
      this.log('add flag')
    }

    // check for fmnrc file
    if (checkForFile(fmnrcPath)) {
      // if fmnrc file is there, we want to read from the file
      readFile(fmnrcPath, (err, data) => {
        // handle error
        if (err) return this.error('Something went wrong reading fmnrc.json.\n')
        // extract todos list from fmnrc
        const {name, vers, desc, todos} = JSON.parse(data.toString())

        this.log(textSync(name) + ' v' + vers + '\n\n' + desc + '\n\n')

        todos.forEach((todo: string | undefined) => {
          this.log(todo)
        })
      })
    } else {
      // no fmnrc file found, we post a warning to the console
      this.warn(redBright('No fmnrc was detected!\nEnsure that you are in a project root directory (package.json)\nRun "fmn init" command.'))
    }

    const name = flags.name ?? 'world'
    this.log(`hello ${name} from /media/tylerturnipseed/datapart/Projects/fmn-cli/src/commands/todo.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
