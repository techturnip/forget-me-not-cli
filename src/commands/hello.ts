import {Command, flags} from '@oclif/command'

// Gradient Text Library
const gradient = require('gradient-string')

// ASCII Font Library
const figlet = require('figlet')

// Get version from package.json
const pjson = require('../../package.json')

export default class Hello extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ fmn hello
hello world from ./src/hello.ts!
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(Hello)

    const ver = pjson.version

    this.log(gradient.passion(figlet.textSync(`FMN CLI v${ver}`, {
      font: 'Big',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true,
    })))

    this.log('Welcome to Forget Me Not! CLI \n')
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
