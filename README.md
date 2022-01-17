# shelljs-plugin-inspect

[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fnfischer%2Fshelljs-plugin-inspect%2Fbadge%3Fref%3Dmain&style=flat-square)](https://actions-badge.atrox.dev/nfischer/shelljs-plugin-inspect/goto?ref=main)
[![npm](https://img.shields.io/npm/v/shelljs-plugin-inspect.svg?style=flat-square)](https://www.npmjs.com/package/shelljs-plugin-inspect)
[![shelljs-plugin](https://img.shields.io/badge/shelljs-plugin-brightgreen.svg?style=flat-square)](https://github.com/shelljs/shelljs/wiki/Using-ShellJS-Plugins)

A [ShellJS](https://github.com/shelljs/shelljs) plugin to add `.inspect()`
methods for REPL use.

## Installation

```bash
$ npm install --save shelljs
$ npm install --save shelljs-plugin-inspect
```

## Usage

Use this plugin in a Node REPL like so:

Without this plugin:

```javascript
> shell.cat('file1.txt'); // Yuck!
{ [String: 'These are the file contents\nAnd they\'re printed out nicely!\n']
  stdout:'These are the file contents\nAnd they\'re printed out nicely!\n',
  stderr: null,
  code: 0,
  cat: [Function: bound ],
  head: [Function: bound ],
  tail: [Function: bound ],
  to: [Function: bound ],
  toEnd: [Function: bound ],
  sed: [Function: bound ],
  sort: [Function: bound ],
  uniq: [Function: bound ],
  grep: [Function: bound ],
  exec: [Function: bound ] }
```

After:

```
> require('shelljs-plugin-inspect');
> shell.cat('file.txt');
These are the file contents
And they're printed out nicely!

> shell.ls();
file.txt
otherfile.txt
...

> shell.pwd();
path/to/current/directory
```

## Writing ShellJS plugins

If you're interested in taking a look at the current state of the ShellJS plugin
API, take a look at [index.js](index.js). This has helpful comments explaining
the necessary boilerplate for writing a plugin. For an example usage of the
plugin, take a look at [test/test.js](test/test.js).
