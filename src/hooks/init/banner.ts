import {Hook} from '@oclif/config'

const gradient = require('gradient-string')

const figlet = require('figlet')

const hook: Hook<'init'> = async function (opts) {
  // if opts.id is a string we assign the value to id
  // so that we can check the length if a value exists
  const id = opts.id ? opts.id : ''

  // if id does not have a length then there is no command
  // meaning we are simply using the base command
  if (id.length === 0) {
    // we print out the figlet banner with a gradient applied
    this.log(gradient.passion(figlet.textSync(`FMN CLI v${opts.config.version}`, {
      font: 'Big', // sets the figlet font
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true,
    })))
    // print out welcome message
    this.log(gradient.passion('Welcome to the Forget Me Not! CLI\n'))
    // after hook, default messaging will appear
  }
}

export default hook
