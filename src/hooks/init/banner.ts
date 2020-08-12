import {Hook} from '@oclif/config'

const gradient = require('gradient-string')

const figlet = require('figlet')

const hook: Hook<'init'> = async function (opts) {
  if (typeof(opts.id) !== 'string') {
    process.stdout.write(gradient.passion(figlet.textSync(`FMN CLI v${opts.config.version}`, {
      font: 'Big',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true,
    })))
    process.stdout.write('\n')
    process.stdout.write(gradient.passion('Welcome to the Forget Me Not! CLI '))
    process.stdout.write('\n\n')
  }
}

export default hook
