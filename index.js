var util = require('util');

var plugin = require('shelljs/plugin');

function inspect() {
  return this.stdout;
}

// Newer versions of node use a symbol called util.inspect.custom.
var inspectAttribute = util.inspect.custom || 'inspect';

// Try to minimize what this plugin does as much as possible
plugin.register(inspectAttribute, inspect, {
  allowGlobbing: false,
  pipeOnly: true,
  wrapOutput: false,
});

// Note: this must not be named 'exports.inspect' otherwise this will trigger
// the deprecation warning!
exports.customInspect = inspect;
