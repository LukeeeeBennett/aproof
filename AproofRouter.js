function AproofRouter(routes) {
  this.routes = routes;
}

AproofRouter.prototype.action = function getRoute({ url }) {
  return this.routes[url];
}

AproofRouter.prototype.entry = function entry(body, request, response) {
  return this.action(request)(body, request, response);
}

module.exports = AproofRouter;
