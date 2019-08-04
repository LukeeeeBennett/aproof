module.exports = function aproofHook(body, request, response) {
  return new Promise((resolve, reject) => {
    return resolve([200, 'test']);
  });
}
