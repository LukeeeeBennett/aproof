const http = require('http');

const DEFAULT_PORT = 4900;
const DEFAULT_TIMEOUT = 1000 * 60 * 2;

function AproofServer(router, options = {}) {
  this.router = router;
  this.port = options.port || DEFAULT_PORT;

  this.server = http.createServer(this.handleRequest.bind(this));
  this.server.timeout = options.timeout || DEFAULT_TIMEOUT;
}

AproofServer.prototype.listen = function listen() {
  console.info(`Listening on port ${this.port}`);
  this.server.listen(this.port);
}

AproofServer.prototype.handleRequest = function handleRequest(request, response) {
  let body = [];
  request
    .on("data", chunk => body.push(chunk))
    .on("end", () => {
      if (body.length > 0) body = JSON.parse(Buffer.concat(body).toString());
      this.router.entry(body, request, response)
        .then(result => {
          const [statusCode, res] = Array.isArray(result) ? result : [200, result];
         return this.respond(response, statusCode, res);
        })
        .catch(error => {
          const [statusCode, err] = Array.isArray(error) ? error : [500, error];
          return this.respond(response, statusCode, err.toString());
        });
    });
}

AproofServer.prototype.respond = function respond(response, statusCode, message) {
  const body = JSON.stringify(message);
  response.writeHead(statusCode, {
    "Content-Length": Buffer.byteLength(body),
    "Content-Type": "application/json"
  });
  response.end(body);
}

module.exports = AproofServer;
