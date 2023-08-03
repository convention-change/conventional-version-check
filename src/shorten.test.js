const shorten = require('./shorten');

test('shorten', () => {
  const sha = '5fe8d4ba49e1ac53c1c434764ddba14428191f91';
  const length = 8;
  let shortSha = shorten(sha, length);
  expect(shortSha).toBe('5fe8d4ba');
});
