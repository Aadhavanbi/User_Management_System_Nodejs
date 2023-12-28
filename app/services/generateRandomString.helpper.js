const crypto = require('crypto');

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789';
  const randomBytes = crypto.randomBytes(length);
  let result = '';

  for (let i = 0; i < randomBytes.length; i++) {
    const randomIndex = randomBytes.readUInt8(i) % characters.length;
    result += characters.charAt(randomIndex);
  }

  return result;
}
module.exports= generateRandomString;

