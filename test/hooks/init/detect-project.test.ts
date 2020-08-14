import {expect, test} from '@oclif/test'

describe('detect-project', () => {
  test
  .stdout({print: true})
  .hook('detect-project')
  .it('checks for package.json file', ctx => {
    expect(ctx.stdout).to.contain('')
    // eslint-disable-next-line no-console
    console.log(ctx.stdout)
  })
})
