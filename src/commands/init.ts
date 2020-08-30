import {Command, flags} from '@oclif/command'
import checkForFile from '../helpers/check-for-files'
import * as fs from 'fs'
import {redBright, greenBright, yellowBright} from 'chalk'
import cli from 'cli-ux'

// paths to use with the helper function below
const pjsonPath = './package.json'
const fmnrcPath = './fmnrc.json'

export default class Init extends Command {
  // meta description of the command
  static description = 'Generate an fmnrc.json file to track project details and todos.'

  // define flags
  static flags = {
    help: flags.help({char: 'h'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f', description: 'forces overwrite of fmnrc.json file'}),
  }

  async run() {
    // destructure flags passed with the command
    const {flags} = this.parse(Init)

    // we want to check if there is a fmnrc.json file already present
    if (checkForFile(fmnrcPath)) {
      // fmnrc.json is present, we check for the force flag
      if (flags.force) {
        // if the force flag is present we will show an overwrite warning
        this.warn(yellowBright('Using the force flag will result in an overwrite of your fmnrc.json file!'))

        // then we will confirm if the user wishes to continue
        const confirmation: boolean = await cli.confirm(yellowBright('Do you want to continue? (Y/n)'))

        // if the confirmation is false, we exit the command
        if (!confirmation) return

        // if the confirmation is true, it will continue on to the pjson check
        // and proceed with the file overwrite
      } else {
        // if no force flag is detected we warn the user that there is already
        // an fmnrc.json file present
        this.warn(yellowBright('Project has already been initialized with fmn!'))

        // exit the command, no need for an overwrite
        return
      }
    }

    // there is not already an fmnrc.json file present, we generate one
    // check for existing package.json
    if (checkForFile(pjsonPath)) {
      // read the package.json file
      fs.readFile(pjsonPath, (err, data) => {
        // throw an error if there is one
        if (err) return this.error('Something went wrong while reading package.json.\n')

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
        fs.writeFile('fmnrc.json', JSON.stringify(fmnrc, null, 2), err => {
          if (err) return this.error(redBright('Something went wrong while writing the fmnrc.json file.\n'))

          this.log(greenBright('Project has been initialized with fmn!\n'))
        })
      })
    } else {
      this.warn(redBright('No project was detected!\nPlease make sure you\'re at the root directory of the project you wish to initialize with fmn.'))
    }
  }
}
