/* eslint-disable no-process-exit */
// ==========================================|
// IMPORTS ----------------------------------|
// ==========================================|
import {Command, flags} from '@oclif/command'
import checkForFile from '../helpers/check-for-files'
import * as fs from 'fs'
import {redBright, greenBright, yellowBright} from 'chalk'
import cli from 'cli-ux'
import {addProject} from '../models/project-model'
import db from '../data/db-config'
// ==========================================|
// GLOBAL -----------------------------------|
// ==========================================|
const pjsonPath = './package.json'
const fmnrcPath = './.fmnrc.json'
// ==========================================|
// COMMAND ----------------------------------|
// ==========================================|
export default class Init extends Command {
  // ----------------------------------------|
  // Command description --------------------|
  // ========================================|
  static description = 'Generate an fmnrc.json file to track project details and todos.'
  // ----------------------------------------|
  // Command flags --------------------------|
  // ========================================|
  static flags = {
    help: flags.help({char: 'h'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f', description: 'forces overwrite of fmnrc.json file'}),
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
    const {flags} = this.parse(Init) // destructure flags
    // ======================================|
    // Init Command logic ===================|
    // ======================================|
    // CHECK FOR FMNRC ----------------------|
    // --------------------------------------|
    // we want to check if there is a fmnrc.json file already present
    if (checkForFile(fmnrcPath)) {
      // ------------------------------------|
      // FORCE FLAG -------------------------|
      // ------------------------------------|
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
      } // end if (flags.force)
      // ------------------------------------|
    } // end if fmnrc exists
    // --------------------------------------|
    // CHECK FOR PJSON ----------------------|
    // --------------------------------------|
    // there is not already an fmnrc.json file present, we generate one
    // check for existing package.json
    if (checkForFile(pjsonPath)) {
      // ------------------------------------|
      // GENERATE FMNRC ---------------------|
      // ------------------------------------|
      // read the package.json file
      const pjson = JSON.parse(fs.readFileSync(pjsonPath).toString())

      const projectDetails = {
        name: pjson.name,
        description: pjson.description,
        version: pjson.version,
        path: process.cwd(),
      }

			try {
				const result = await addProject(projectDetails, this.log)
        this.log(greenBright(`Project ${result.name} has been initialized with fmn!\n`))
			} catch (error) {
				this.warn(error)
      }
      // ------------------------------------|
    } else {
      // failed check for pjson file
      this.warn(redBright('No project was detected!\nPlease make sure you\'re at the root directory of the project you wish to initialize with fmn.'))
    }
    // --------------------------------------|
  }
}
