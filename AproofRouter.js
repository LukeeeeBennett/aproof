function AproofRouter(routes) {
  this.routes = routes;
}

AproofRouter.prototype.action = function action({ url }) {
  return this.routes[url];
}

AproofRouter.prototype.entry = function entry(body, request, response) {
  return new Promise((resolve, reject) => {
    const action = this.action(request)

    if (!action) throw [404, new Error('not found')] // TODO: real error

    return action(body, request, response).then(resolve).catch(reject);
  });
}

module.exports = AproofRouter;
