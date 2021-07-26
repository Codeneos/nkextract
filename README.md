nkextract
=========

Extract Gallery Images from NK.pl

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Installation
### Prerequisites
* Installed git; Windows users click **[here](https://git-scm.com/download/win)** to download the latest version
* NodeJS LTS version 12+; for all platforms download from **[here](https://nodejs.org/en/download/)**
* Comfortable with using Bash or PowerShell

### Step-by-step
* After installing all **Prerequisites** open a new Powershell or Command window.
* Check out the nkextract from github enter the following command:
  ```sh-session
  git clone https://github.com/Codeneos/nkextract.git
  ```
* Install nkextract
  ```sh-session
  npm install
  npm run prepack
  npm link --force
  ```
* Extract private gallery images using the following command:
  ```sh-session
  nkextract profile
  ```

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
