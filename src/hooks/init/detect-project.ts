import {Hook} from '@oclif/config'
import * as fs from 'fs'
import {red, green} from 'chalk'

// Path variable to store a path to package.json file
const path = './package.json'

// Function, takes in a path (string) for a package.json
function checkForPjson(path: string) {
  if (fs.existsSync(path)) {
    return green(`Project detected at ${process.cwd()}`)
  }

  return red(`No project detected at ${process.cwd()}`)
}

// Hook definition
const hook: Hook<'init'> = async function (/* opts */) {
  // add 2 line breaks to the output
  process.stdout.write(`${checkForPjson(path)} ${'\n\n'}`)
}

export default hook
