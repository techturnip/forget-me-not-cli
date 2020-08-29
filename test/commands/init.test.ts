import {expect, test} from '@oclif/test'
const path = require('path')
import cli from 'cli-ux'
const fs = require('fs')

const mockProjectFmnrc = '/mockProjectFmnrc'
const mockNoProject = '/mockNoProject'

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

describe('init (project w/ fmnrc)', () => {
  chdir(mockProjectFmnrc)

  test
  .stderr()
  .command(['init'])
  .it('warns if project has already been initialized', ctx => {
    expect(ctx.stderr).to.contain(
      'Warning: Project has already been initialized with fmn!'
    )
  })

  test
  .stub(cli, 'confirm', () => async () => 'Y')
  .stdout()
  .stderr()
  .command(['init', '-f'])
  .it('should successfully write new fmnrc file', ctx => {
    expect(ctx.stderr).to.contain(
      'Warning: Using the force flag will result in an overwrite of your fmnrc.json'
    )
    expect(ctx.stdout).to.contain('Project has been initialized with fmn!')
  })
})

describe('init (project no fmnrc)', () => {
  beforeEach(async () => {
    await chdir('/mockProject')
  })
  afterEach(async () => {
    await fs.unlinkSync('fmnrc.json')
  })

  test
  .stdout()
  .command(['init'])
  .it('generates fmnrc file', ctx => {
    expect(fs.existsSync('fmnrc.json')).to.be.true
    expect(ctx.stdout).to.contain('Project has been initialized with fmn!')
  })
})

describe('init (no project)', () => {
  beforeEach(async () => {
    await chdir(mockNoProject)
  })
  test
  .stderr()
  .command(['init'])
  .it('displays no project error', ctx => {
    expect(ctx.stderr).to.contain('Warning: No project was detected!')
  })
})
