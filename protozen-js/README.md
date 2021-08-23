# protozen

Enlightened protobuf communication support from Javascript front-ends to Erlang or Golang servers

This project is not doing anything useful at the moment.

It can be used as a template for a setup that contains a toolchain for the development of JavaScript
web front-ends, that use protocol buffers as communication with an Erlang or Golang server.

In the future, it will be further developed to improve protobuf communication with built in pubsub and
data streaming.

I am not supporting this code right now, which means that errors will not be fixed for now.

## Contents of protozen-js

The protozen-js folder contains the source of several Javascript packages. They are organized in a
monorepo structure maintained with Lerna and organized in Yarn workspaces.

The packages have various functionality. They provide deployable front-end websites, libraries, and
console commands against the back-end.

### @protozen/web

The main website.

### @protozen/service

A common library that provides service access to the back-end. Used by both web and command.

### @protozen/config

Low level configuration for development: linting, type checking, debugging, etc.

## Usage of protozen-js

There are two ways of using the packages. From the sources, or from the released packages.

1. From the sources: the current git tree has to be checked out locally. The 'jake' utility is used to
   execute various functionality.

2. Installing from released packages. Installation can be done with the Yarn package manager,
   only required with NodeJS and Yarn installed. - Currently no packages are released.

## Installing NodeJS

NodeJS is a requirement for running the scripts and development utilities.

A minimum of `12.12.0` is required. The deployed tools can run already on `10.16.3 LTS`, but
this currently does not support the debugger. If debugging is needed, then a minimum of `v12`
is required.

The suggested installation is through `nvm`, Node Version Manager. The installation of `nvm` is
fully described on [the github page](https://github.com/nvm-sh/nvm) of nvm.

To **install** or **update** nvm, you can use the install script using cURL:

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash
```

or Wget:

```sh
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash
```

<sub>The script clones the nvm repository to `~/.nvm` and adds the source line to your profile
(`~/.bash_profile`, `~/.zshrc`, `~/.profile`, or `~/.bashrc`).</sub>

Install NodeJS for the first time:

```sh
nvm install 12.12.0
```

Any time later, the version to be used can be selected:

```sh
nvm use 12.12.0
```

This makes the `node` command run the required version. This can be checked:

```sh
node -v
#=> v12.12.0
```

Follow additional information from the installation page to further customize bash or zsh behaviour. The
protozen repository contains an `.nvmrc` file that will select the required NodeJS version upon entering
the directory, if
[deeper shell integration](https://github.com/nvm-sh/nvm/blob/master/README.md#deeper-shell-integration)
is installed. An alternate option is to put the `nvm use 12.12.0` command into your `.bashrc` or `.zshenv`.
