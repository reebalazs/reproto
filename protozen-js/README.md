protozen
========

Enlightened protobuf communication support from Javascript front-ends to Erlang or Golang servers

This project is not doing anything useful at the moment.

It can be used as a template for a setup that contains a toolchain for the development of JavaScript
web front-ends, that use protocol buffers as communication with an Erlang or Golang server.

In the future, it will be further developed to improve protobuf communication with built in pubsub and
data streaming.

I am not supporting this code right now, which means that errors will not be fixed for now.


Contents of protozen-js
-----------------------

The protozen-js folder contains the source of several Javascript packages. They are organized in a
monorepo structure maintained with Lerna and organized in Yarn workspaces.

The packages have various functionality. They provide deployable front-end websites, libraries, and
console commands against the back-end.

### @protozen/web

The main website.

### @protozen/command

Executable commands that can be run from the terminal against the back-end.

### @protozen/service

A common library that provides service access to the back-end. Used by both web and command.

### @protozen/config

Low level configuration for development: linting, type checking, debugging, etc.


Usage of protozen-js
--------------------

There are two ways of using the packages. From the sources, or from the released packages.

1. From the sources: the current git tree has to be checked out locally. The 'jake' utility is used to
   execute various functionality.

2. Installing from released packages. Installation can be done with the Yarn package manager,
   only required with NodeJS and Yarn installed. - Currently no packages are released.


Installing NodeJS
-----------------

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


Installing from sources
-----------------------

The sources has to be checked out from git.


Following that, you need to activate the `jake` command.
From the root of the tree, source one of the jake definition helpers:

```sh
source protozen-js/def-jake-helper.bash
```

Or:

```sh
source protozen-js/def-jake-helper.zsh
```

Following that, you can execute the `jake` command from anywhere inside the working directory. You are allowed
to be in any sub directory, or inside the `protozen-service` structure as well.

The `jake` command is the Javascript equivalent of the GNU Make utility and has similar features. It can be
used to:

- carry out installation and build
- utilities used for front-end development (Continuous Development)
- execute commands provided by the @protozen/command package

<sub>If you don't want to use the jake helpers for any reason, you could also just call the `.jake` script
in the root of the working directory. The advantage of the helper is that it allows jake to be used from
everywhere within the tree. It also disables globbing in zsh, which makes it unnecessary to escape brackets used for
passing parameters. (Zsh would require this escaping by default.)</sub>

To make the jake command permanent, you can add the source line to your `.basrc` or `.zshrc`, respectively.


### Running commands when checked out from git

Commands can be run by the `jake` utility. This is the JavaScript equivalent of GNU Make. To start:

```sh
jake
==>   protozen:info:jake Namespaces: web, service, command. Targets: install, protoc, protodesc, lint, help +0ms
```

Everything should work independently from the current working directory.

You can get a more detaled help by the help task.

```sh
jake help
```

This will output:

```
  protozen:info:jake Namespaces:
  protozen:info:jake
  protozen:info:jake web:                @protozen/web package
  protozen:info:jake service:            @protozen/service package
  protozen:info:jake command:            @protozen/command package
  protozen:info:jake
  protozen:info:jake Root targets:
  protozen:info:jake
  protozen:info:jake jake install        install or update packages
  protozen:info:jake jake protoc         compile the protos
  protozen:info:jake jake protodebug     compile the proto files for debugging
  protozen:info:jake jake lint           lint the code
  protozen:info:jake jake help           print this help
  protozen:info:jake
  protozen:info:jake jake protodesc      compile the proto descriptor (for debuggers)
  protozen:info:jake jake protomap       compile the proto view mappint (for Charles Proxy)
  protozen:info:jake jake eslint         eslint, part of lint
  protozen:info:jake jake flow           flow, part of lint
  protozen:info:jake
  protozen:info:jake Namespaces help:
  protozen:info:jake
  protozen:info:jake jake web            print help about the web namespace
  protozen:info:jake jake service        print help about the service namespace
  protozen:info:jake jake command        print help about the command namespace
  protozen:info:jake
  protozen:info:jake    +0ms
```


### Installing Javascript dependencies

All dependencies can be installed with jake.

```sh
jake install
```


Running commands
----------------

The command utility is providing commands that can be run from the console. There are two ways to run the commands, directly or from jake.

- The parameter passing is different between the two methods

- Jake can only be used in development mode, while the direct call can be used either in development mode, or when the command package is
  installed directly as a released package.


### Using the packages directly

First you have to locate the package binaries. If the command package is installed, the `yarn bin` command will tell the full path of the
binary files. To use yarn this way, you must be inside the `protozen-js/packages` directory. We use the hello script as example:

```sh
yarn bin hello
#=> /Users/ree/work/protozen/protozen-js/packages/node_modules/.bin/hello
```

To run the script, you can use this path, or you can use shell substitute of the path with backticks, on the fly.

```sh
`yarn bin hello`
#=>  protozen:info:hello Hello World! +0ms
```

The scripts follow default parameter passing. You can ask for help.

```sh
`yarn bin hello` --help
```

This will output the help about the options.

```
Options:
  --help       Show help                                               [boolean]
  --version    Show version number                                     [boolean]
  --world, -w  What to tell to the world                      [default: "World"]
  --delay      Delay this much milliseconds                             [number]
```

Based on this you can pass parameters to the script to modify its behaviour.

```sh
`yarn bin hello` --world Protozen
#=>  protozen:info:hello Hello Protozen! +0ms
```

You can also add a second parameter which will just simulate some delay in the hello script.

```sh
`yarn bin hello` --world Protozen --delay 2000
#=>  protozen:info:hello Hello Protozen! +0ms
```


## Using the packages from Jake

While you can also use packages directly as described above, in development mode you can also call them alternately through Jake,
as Jake tasks.
This provides some advantages:

- Can be executed from anywhere in the soucre tree, even from inside `protozen-services`. The execution is agnostic to the
  current directory.

- Can be combined with other jake tasks.

The commands provided by the command package are in the command namespace of Jake.
All tasks in the command namespace are prefixed with `command:`.
First, ask help about the avaliable tasks from jake:

```sh
jake command:help
```

This will output:

```
  protozen:info:jake Command namespace:
  protozen:info:jake
  protozen:info:jake jake command:hello                   say hello (used for testing)
  protozen:info:jake jake command:test                    run regression tests
  protozen:info:jake jake command:help                    print this help
  protozen:info:jake
  protozen:info:jake jake command:jest                    jest, part of test
  protozen:info:jake
  protozen:info:jake    +0ms
```

To run the `hello` command:

```sh
jake command:hello
#=>   protozen:info:hello Hello World! +0ms
```

The parameters must be passed in a slightly different way to Jake tasks. The basic rule is: Take what you wanted to pass
in the command line, put them in brackets, and separate them by commas instead of spaces. (Spaces are not allowed.)
This way `--world Protozen` would become `[--world,Protozen]`.

Calling the `hello` command with Jake:

```sh
jake command:hello[--world,Protozen]
#=>  protozen:info:hello Hello Protozen! +0ms
```

Example for adding a second parameter:

```sh
jake command:hello[--world,Protozen,--delay,2000]
#=>  protozen:info:hello Hello Protozen! +0ms
```

Spaces and special characters are not allowed in Jake task parameters. Such characters need to be escaped with
html entity escaping (in the same way as used for query parameters in an url). For example, if you wanted to pass using the direct
calling scheme:

```sh
`yarn bin hello` --world "my apitoken: ABCD=="
#=>  protozen:info:hello Hello my apitoken: ABCD! +0ms
```

Then you have to encode the spaces, commas, equal signs and other special characters according to the html entity encoding:

```sh
jake command:hello[--world,my%20apitoken:%20ABCD%3d%3d]
#=>  protozen:info:hello Hello my apitoken: ABCD==! +0ms
```

This is needed for Jake's action syntax, with the advandage that Jake can handle action dependencies, and also, by default,
allows the execution of multiple actions on the same command line.

<sub>Remember that if you don't like this, you can execute
the commands directly, even in development mode. Note that in this case you must run the script by its absolute path of the script,
or, you have to be inside the packages directory and use `yarn bin` to get the absolute path of the script.</sub>


## Debugging scripts

For debugging purposes, you can pass the `dev` parameter to the script via Jake. This will invoke the nodejs inspector which
enables to set up breakpoints with the `debugger` statement inside the script.

```sh
jake command:hello[--world,Protozen,dev]
#=>  (enters to the Node inspector)
```

Also for debugging purposes, you can specify the `bin` parameter, which will cause the script to go through the executable
path. instead of the direct Javascript import of the command. This can be used to check that the binary version of the
script enters correctly, and can be a useful check before releasing.

The `bin` and `dev` parameters will be removed by Jake, before the rest of the parameters are passed to the command script.

The `bin` and `dev` parameters can also be used together.


