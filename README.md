fmn-cli
=======

Global CLI for managing todos across projects

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/fmn-cli.svg)](https://npmjs.org/package/fmn-cli)
[![Downloads/week](https://img.shields.io/npm/dw/fmn-cli.svg)](https://npmjs.org/package/fmn-cli)
[![License](https://img.shields.io/npm/l/fmn-cli.svg)](https://github.com/techturnip/fmn-cli/blob/master/package.json)
[![Travis CI](https://travis-ci.com/techturnip/forget-me-not-cli.svg?branch=master)

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
fmn-cli/0.0.1 linux-x64 node-v12.18.3
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
* [`fmn init`](#fmn-init)
* [`fmn todo [FILE]`](#fmn-todo-file)

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

_See code: [src/commands/hello.ts](https://github.com/techturnip/forget-me-not-cli/blob/v0.0.1/src/commands/hello.ts)_

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

## `fmn init`

Generate an fmnrc.json file to track project details and todos.

```
USAGE
  $ fmn init

OPTIONS
  -f, --force  forces overwrite of fmnrc.json file
  -h, --help   show CLI help
```

_See code: [src/commands/init.ts](https://github.com/techturnip/forget-me-not-cli/blob/v0.0.1/src/commands/init.ts)_

## `fmn todo [FILE]`

describe the command here

```
USAGE
  $ fmn todo [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/todo.ts](https://github.com/techturnip/forget-me-not-cli/blob/v0.0.1/src/commands/todo.ts)_
<!-- commandsstop -->
