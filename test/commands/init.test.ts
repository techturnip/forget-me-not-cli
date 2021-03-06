// ==========================================|
// IMPORTS ----------------------------------|
// ==========================================|
import {expect, test} from '@oclif/test'
const path = require('path')
import cli from 'cli-ux'
const fs = require('fs')
// ==========================================|
// SETUP ------------------------------------|
// ==========================================|
const mockProjectFmnrc = '/mockProjectFmnrc'
const mockNoProject = '/mockNoProject'
const startingDir = process.cwd()
// ==========================================|
// HELPER FUNCTIONS -------------------------|
// ==========================================|
// CHDIR HELPER FUNCTION --------------------|
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
// chdir() - helper function that wraps the ~|
// node process.chdir() method. ~~~~~~~~~~~~~|
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
function chdir(mockPath: string) {
  process.chdir(path.join(__dirname, mockPath))
}
// ==========================================|
// TESTING ----------------------------------|
// ==========================================|
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
// Describe block for init command ran in ~~~|
// project w/ an fmnrc.json file present in ~|
// in directory ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
describe('init (project w/ fmnrc)', () => {
  // ========================================|
  // Setup/Cleanup --------------------------|
  // ========================================|
  // beforeEach() setup method --------------|
  // ----------------------------------------|
  beforeEach(() => chdir(mockProjectFmnrc))
  // ----------------------------------------|
  // after() cleanup method -----------------|
  // ----------------------------------------|
  // after all tests we change directory back
  // to the directory we started in
  after(() => process.chdir(startingDir))
  // ----------------------------------------|
  // ========================================|
  // Test -----------------------------------|
  // ========================================|
  test
    .stderr()
    .command(['init'])
    .it('warns if project has already been initialized', ctx => {
      // we expect a warning that the project has been initialized
      expect(ctx.stderr).to.contain('Warning: Project has already been initialized with fmn!')
      // and that the fmnrc.json file does exist
      expect(fs.existsSync('.fmnrc.json')).to.be.true
    })
  // test init command with force flag
  test
    .stub(cli, 'confirm', () => async () => 'Y')
    .stdout()
    .stderr()
    .command(['init', '-f'])
    .it('should successfully write new fmnrc file', ctx => {
      // we expect there to be a warning about using the force flag
      expect(ctx.stderr).to.contain('Warning: Using the force flag')
      // we expect some output that the project has been initialized meaning
      // the fmnrc.json file has been regenerated
      expect(ctx.stdout).to.contain('Project has been initialized with fmn!')
    })
})
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
// Describe block for init command ran in ~~~|
// project w/ no fmnrc.json file present ~~~~|
// in directory ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
describe('init (project no fmnrc)', () => {
  // ========================================|
  // Setup/Cleanup --------------------------|
  // ========================================|
  // beforeEach() setup method --------------|
  // ----------------------------------------|
  beforeEach(() => chdir('/mockProject'))
  // ----------------------------------------|
  // afterEach() cleanup method -------------|
  // ----------------------------------------|
  afterEach(() => {
    // after each test we want to delete the
    // fmnrc.json file
    fs.unlinkSync('.fmnrc.json')
  })
  // ----------------------------------------|
  // after() cleanup method -----------------|
  // ----------------------------------------|
  // after all tests we change directory back
  // to the directory we started in
  after(() => process.chdir(startingDir))
  // ----------------------------------------|
  // ========================================|
  // Test -----------------------------------|
  // ========================================|
  test
    .stdout()
    .command(['init'])
    .it('generates fmnrc file', ctx => {
      // we expect that the fmnrc.json exists
      expect(fs.existsSync('.fmnrc.json')).to.be.true
      // and we have output that the Project has been initialized
      expect(ctx.stdout).to.contain('Project has been initialized with fmn!')
    })
})
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
// Describe block for init command ran in ~~~|
// dir w/ no project.json file present ~~~~~~|
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
describe('init (no project)', () => {
  // ========================================|
  // Setup/Cleanup --------------------------|
  // ========================================|
  // beforeEach() setup method --------------|
  // ----------------------------------------|
  beforeEach(() => chdir(mockNoProject))
  // ----------------------------------------|
  // after() cleanup method -----------------|
  // ----------------------------------------|
  // after all tests we change directory back
  // to the directory we started in
  after(() => process.chdir(startingDir))
  test
    .stderr()
    .command(['init'])
    .it('displays no project error', ctx => {
      // we expect a warning that no project has been detected
      expect(ctx.stderr).to.contain('Warning: No project was detected!')
    })
})
// ------------------------------------------|
