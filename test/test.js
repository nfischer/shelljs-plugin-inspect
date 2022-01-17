/* globals describe, it */

var pluginInspect = require('..');
// If we were using additional plugins, we could load them here

var shell = require('shelljs'); // recommended
var fs = require('fs');
var util = require('util');

require('should');

// Newer versions of node use a symbol called util.inspect.custom.
var inspectAttribute = util.inspect.custom || 'inspect';

// override console.error() to cover up common.error() calls
console.error = function () { };

describe('plugin-inspect', function () {
  it('does not get added to the shelljs instance', function () {
    shell.should.not.have.property('inspect');
    shell.should.not.have.property(util.inspect.custom);
  });

  it('does not override other commands or methods', function () {
    /*
     * Plugins shouldn't interfere with existing commands
     */
    shell.cp.should.be.type('function');
    shell.mv.should.be.type('function');
    shell.ls().should.have.property('toEnd');
    shell.ls().should.have.property('grep');
    shell.ls().should.have.property('sed');
  });

  it('exports the plugin implementation', function () {
    /*
     * A plugin author can also export the implementation of their commands
     */
    pluginInspect.should.be.type('object');
    pluginInspect.customInspect.should.be.type('function');
  });

  it('gets added as a method on ShellStrings', function () {
    /*
     * Plugins can be methods on ShellStrings
     */
    var ret = shell.ls();
    ret[inspectAttribute].should.be.type('function');
  });

  it('works for strings', function () {
    var ret = shell.cat('index.js');
    util.inspect(ret).should.equal(fs.readFileSync('index.js', 'utf-8'));
  });

  it.skip('works for commands with no trailing newline', function () {
    var ret = shell.pwd();
    util.inspect(ret).should.equal(process.cwd() + '\n');
  });

  it('works for arrays', function () {
    var ret = shell.cat('index.js');
    util.inspect(ret).should.equal(fs.readFileSync('index.js', 'utf-8'));
  });

  it('gets applied directly to ShellStrings', function () {
    var ret = new shell.ShellString('Hello world');
    util.inspect(ret).should.be.type('string');
    util.inspect(ret).should.equal('Hello world');
  });

  it('works for piped commands', function () {
    var ret = shell.cat('index.js').grep('o');
    util.inspect(ret).should.equal(shell.grep('o', 'index.js').toString());
  });

  it('works for commands that have errors', function () {
    var ret = shell.rm('fakeFileName.txt');
    util.inspect(ret).should.equal('');
  });

  it('does not break non-ShellString commands', function () {
    var ret = shell.test('-f', 'index.js');
    ret.should.equal(true);
  });
});
