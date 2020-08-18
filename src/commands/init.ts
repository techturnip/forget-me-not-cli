import {Command, flags} from '@oclif/command'
import * as fs from 'fs'

// paths to use with the helper function below
const pjsonPath = './package.json'
const fmnrcPath = './fmnrc.json'

// helper function that uses fs module to check for a file at
// the specified relative path, relative to cwd
// function should be extracted into separate file
function checkForFile(path: string) {
  if (fs.existsSync(path)) {
    return true
  }

  return false
}

export default class Init extends Command {
  // meta description of the command
  static description = 'Generate an fmnrc.json file to track project details and todos.'

  // define flags
  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  // define arguments
  static args = [{name: 'file'}]

  async run() {
    // we want to check if there is a fmnrc.json file already present
    if (checkForFile(fmnrcPath)) {
      process.emitWarning('Project has already been initialized with fmn!')
      this.exit()
    }

    // there is not already an fmnrc.json file present, we generate one
    // check for existing package.json
    if (checkForFile(pjsonPath)) {
      // read the package.json file
      fs.readFile(pjsonPath, (err, data) => {
        // throw an error if there is one
        if (err) throw err

        // store pjson contents in variable
        const pjson = JSON.parse(data.toString())

        // Then we want to construct our own json
        const fmnrc = {
          name: pjson.name,
          desc: pjson.description,
          vers: pjson.version,
          todos: [],
        }

        // now that we have our object we will create a new file
        fs.writeFile('fmnrc.json', JSON.stringify(fmnrc, null, 2), function (err) {
          if (err) return process.stdout.write('Something went wrong.\n')

          process.stdout.write('Project has been initialized with fmn!\n')
        })
      })
    }

    // no package.json detected

    const {args, flags} = this.parse(Init)

    const name = flags.name ?? 'world'
    this.log(`hello ${name} from /media/tylerturnipseed/datapart/Projects/fmn-cli/src/commands/init.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
