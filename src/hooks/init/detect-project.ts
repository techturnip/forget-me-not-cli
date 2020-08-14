import {Hook} from '@oclif/config'
import * as fs from 'fs'
import {red, green} from 'chalk'

const hook: Hook<'init'> = async function (/* opts */) {
  // store path to check for package.json
  const path = './package.json'

  if (fs.existsSync(path)) {
    process.stdout.write(green(`Project detected at ${process.cwd()}`))
    process.stdout.write('\n\n')
  } else {
    process.stdout.write(red(`No project detected at ${process.cwd()}`))
    process.stdout.write('\n\n')
  }
}

export default hook
