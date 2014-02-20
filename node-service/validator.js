var crypto = require('crypto');

module.exports = validate;

var KEY = process.env.KEY;
var SESSION_TIME = 10 * 60;

if (! KEY)
  throw new Error('Key is not defined');

function validate(token) {
  var parts = token.split(' ');

  if (parts.length != 3)
    return false;

  var email = parts[0];
  var ts = parseInt(parts[1]);
  var mac = parts[2];

  if (isNaN(ts) || Date.now()/1000 - ts > SESSION_TIME)
    return false;

  var text = email + ' ' + ts;
  var signed = sign(KEY, text);

  return signed === mac;
}

function sign(key, msg) {
  return crypto.createHmac('sha256', key).update(msg).digest('base64');
}

