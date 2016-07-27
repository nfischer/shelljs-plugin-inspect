var plugin = require('shelljs/plugin');

function inspect() {
  return this.stdout;
}

// Try to minimize what this plugin does as much as possible
plugin.register('inspect', inspect, {
  allowGlobbing: false,
  pipeOnly: true,
  wrapOutput: false,
});

exports.inspect = inspect;
