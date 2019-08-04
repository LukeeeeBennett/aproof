const AproofServer = require('./AproofServer');
const AproofRouter = require('./AproofRouter');
const AproofMemStore = require('./AproofMemStore');
const aproofHook = require('./aproofHook');

const router = new AproofRouter({
  '/events/github/review': aproofHook
});
const server = new AproofServer(router);

server.listen();
