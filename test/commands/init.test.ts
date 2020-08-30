import {expect, test} from '@oclif/test'
const path = require('path')
import cli from 'cli-ux'
const fs = require('fs')

const mockProjectFmnrc = '/mockProjectFmnrc'
const mockNoProject = '/mockNoProject'
const startingDir = process.cwd()

// HELPER FUNCTION
async function chdir(mockPath: string): Promise<number> {
  process.chdir(path.join(__dirname, mockPath))
  return new Promise<number>((resolve, reject) => {
    if (process.cwd() === path.join(__dirname, mockPath)) {
      resolve(1)
    } else {
      reject(new Error('whoops'))
    }
  })
}

// DESCRIBE BLOCK
describe('init (project w/ fmnrc)', () => {
  // TEST SETUP
  beforeEach(async () => {
    if (process.cwd() !== path.join(__dirname, mockProjectFmnrc)) {
      try {
        await chdir(mockProjectFmnrc)
      } catch (error) {
        throw new Error(error)
      }
    }
  })

  // AFTER TEST
  after(() => process.chdir(startingDir))

  // TEST
  test
  .stderr()
  .command(['init'])
  .it('warns if project has already been initialized', ctx => {
    expect(ctx.stderr).to.contain('Warning: Project has already been initialized with fmn!')
    expect(fs.existsSync('fmnrc.json')).to.be.true
  })

  // TEST
  test
  .stub(cli, 'confirm', () => async () => 'Y')
  .stdout()
  .stderr()
  .command(['init', '-f'])
  .it('should successfully write new fmnrc file', ctx => {
    expect(ctx.stderr).to.contain(
      'Warning: Using the force flag'
    )
    expect(ctx.stdout).to.contain('Project has been initialized with fmn!')
  })
})

// DESCRIBE BLOCK
describe('init (project no fmnrc)', () => {
  beforeEach(() => {
    chdir('/mockProject')
  })
  afterEach(async () => {
    await fs.unlinkSync('fmnrc.json')
  })
  after(() => process.chdir(startingDir))

  test
  .stdout()
  .command(['init'])
  .it('generates fmnrc file', ctx => {
    expect(fs.existsSync('fmnrc.json')).to.be.true
    expect(ctx.stdout).to.contain('Project has been initialized with fmn!')
  })
})

// DESCRIBE BLOCK
describe('init (no project)', () => {
  beforeEach(async () => {
    await chdir(mockNoProject)
  })
  after(() => {
    process.chdir(startingDir)
  })
  test
  .stderr()
  .command(['init'])
  .it('displays no project error', ctx => {
    expect(ctx.stderr).to.contain('Warning: No project was detected!')
  })
})
