nkextract
=========

Extract Gallery Images from NK.pl

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/nkextract.svg)](https://npmjs.org/package/nkextract)
[![Downloads/week](https://img.shields.io/npm/dw/nkextract.svg)](https://npmjs.org/package/nkextract)
[![License](https://img.shields.io/npm/l/nkextract.svg)](https://github.com/Codeneos/nkextract/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g nkextract
$ nkextract COMMAND
running command...
$ nkextract (-v|--version|version)
nkextract/1.0.0 win32-x64 node-v16.5.0
$ nkextract --help [COMMAND]
USAGE
  $ nkextract COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`nkextract hello [FILE]`](#nkextract-hello-file)
* [`nkextract help [COMMAND]`](#nkextract-help-command)
* [`nkextract profile`](#nkextract-profile)
* [`nkextract profile copy`](#nkextract-profile-copy)
* [`nkextract public GALLERY`](#nkextract-public-gallery)

## `nkextract hello [FILE]`

describe the command here

```
USAGE
  $ nkextract hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ nkextract hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/Codeneos/nkextract/blob/v1.0.0/src/commands/hello.ts)_

## `nkextract help [COMMAND]`

display help for nkextract

```
USAGE
  $ nkextract help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `nkextract profile`

Extract private gallery images NK.pl

```
USAGE
  $ nkextract profile

OPTIONS
  -h, --[no-]headless                  display the Chrome bowrser when extracting images
  -p, --password=password              password used for the NK.pl login
  -u, --user=username@example.com.org  username used for the NK.pl login
```

_See code: [src/commands/profile.ts](https://github.com/Codeneos/nkextract/blob/v1.0.0/src/commands/profile.ts)_

## `nkextract profile copy`

Extract private gallery images NK.pl

```
USAGE
  $ nkextract profile copy

OPTIONS
  -h, --[no-]headless                  display the Chrome bowrser when extracting images
  -p, --password=password              password used for the NK.pl login
  -u, --user=username@example.com.org  username used for the NK.pl login
```

_See code: [src/commands/profile copy.ts](https://github.com/Codeneos/nkextract/blob/v1.0.0/src/commands/profile copy.ts)_

## `nkextract public GALLERY`

Extract public gallery images NK.pl

```
USAGE
  $ nkextract public GALLERY

ARGUMENTS
  GALLERY  comma seperate lists gallery URL snippet(s)

OPTIONS
  -h, --[no-]headless                  display the Chrome bowrser when extracting images
  -p, --password=password              password used for the NK.pl login
  -u, --user=username@example.com.org  username used for the NK.pl login

EXAMPLES
  nkextract public szkola/11498/klasa/12
  nkextract public szkola/23481
  nkextract public szkola/23481,szkola/11498
```

_See code: [src/commands/public.ts](https://github.com/Codeneos/nkextract/blob/v1.0.0/src/commands/public.ts)_
<!-- commandsstop -->
