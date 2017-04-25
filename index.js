(() => {
  'use strict';
  const parseArgs = require('minimist');
  const httpProxy = require('http-proxy');

  const argv = parseArgs(process.argv, {
    alias: {
      port: ['p'],
      target: ['t']
    },
    default: {
      target: 'http://127.0.0.1',
      port: 9000
    }
  });

  const options = {
    target: argv.target,
    xfwd: true,
    ws: true
  };

  const proxy = httpProxy.createProxyServer(options);

  proxy.on('error', (err, req, res) => {
    res.writeHead(500, {
      'Content-Type': 'text/plain'
    });
    res.end('Something went wrong. And we are reporting a custom error message.');
  });

  proxy.listen(argv.port);
})();
