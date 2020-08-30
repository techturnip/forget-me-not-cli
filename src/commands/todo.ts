// ==========================================|
// IMPORTS ----------------------------------|
// ==========================================|
import {Command, flags} from '@oclif/command'
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

    const name = flags.name ?? 'world'
    this.log(`hello ${name} from /media/tylerturnipseed/datapart/Projects/fmn-cli/src/commands/todo.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
