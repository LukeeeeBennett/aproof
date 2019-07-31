const AproofServer = require('./AproofServer');
const AproofRouter = require('./AproofRouter');
const AproofMemStore = require('./AproofMemStore');

const router = new AproofRouter({
  '/events/github/review': Promise.resolve, // TODO githubReviewEvent(),
  '/events/slack/message': Promise.resolve, // TODO slackMessageEvent(),
});
const server = new AproofServer(router.entry);

server.listen();
