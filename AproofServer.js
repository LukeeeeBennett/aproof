const http = require('http');

const DEFAULT_PORT = 4900;
const DEFAULT_TIMEOUT = 1000 * 60 * 2;

function AproofServer(entry, options = {}) {
  this.entry = entry;
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
      body = JSON.parse(Buffer.concat(body).toString());
      this.entry(body, request, response)
        .then(([statusCode, result]) => this.respond(response, statusCode, result))
        .catch(error => this.respond(response, 500, error.toString()));
    });
}

AproofServer.prototype.respond = function respons(response, statusCode, message) {
  const body = JSON.stringify(message);
  response.writeHead(statusCode, {
    "Content-Length": Buffer.byteLength(body),
    "Content-Type": "application/json"
  });
  response.end(body);
}

module.exports = AproofServer;
