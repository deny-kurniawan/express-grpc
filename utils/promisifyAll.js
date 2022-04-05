const { promisify } = require('util');

module.exports = (client) => {
  const to = {};
  for (var k in client) {
    if (typeof client[k] != 'function') continue;
    to[k] = promisify(client[k].bind(client));
  }
  return to;
};
