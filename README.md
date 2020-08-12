fmn-cli
=======

Global CLI for managing todos across projects

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/fmn-cli.svg)](https://npmjs.org/package/fmn-cli)
[![Downloads/week](https://img.shields.io/npm/dw/fmn-cli.svg)](https://npmjs.org/package/fmn-cli)
[![License](https://img.shields.io/npm/l/fmn-cli.svg)](https://github.com/techturnip/fmn-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g fmn-cli
$ fmn COMMAND
running command...
$ fmn (-v|--version|version)
fmn-cli/0.0.0 linux-x64 node-v12.18.3
$ fmn --help [COMMAND]
USAGE
  $ fmn COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`fmn hello [FILE]`](#fmn-hello-file)
* [`fmn help [COMMAND]`](#fmn-help-command)

## `fmn hello [FILE]`

describe the command here

```
USAGE
  $ fmn hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ fmn hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/techturnip/fmn-cli/blob/v0.0.0/src/commands/hello.ts)_

## `fmn help [COMMAND]`

display help for fmn

```
USAGE
  $ fmn help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->
