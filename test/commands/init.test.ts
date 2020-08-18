import {/* expect, */test} from '@oclif/test'

const mockFs = require('mock-fs')

describe('init', () => {
  mockFs({
    'Project/testProject': {
      'package.json': JSON.stringify({name: 'testProject', version: '1.0.0', author: 'Test Author'}),
      'fmnrc.json': JSON.stringify({}),
    },
  })

  test
  .stdout({print: true})
  .command(['init'])
  .it()

  test
  .stdout()
  .command(['init'])

  mockFs.restore()
})
