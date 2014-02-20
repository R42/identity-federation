var crypto = require('crypto');

if (process.argv[0] === 'node')
  process.argv.shift();

if (process.argv.length < 3) {
  console.log('Usage: "%s <key> <message>"', process.argv[0]);
  process.exit(1);
}

var key = process.argv[1];
var msg = process.argv.slice(2).join(' ');

var hmac = crypto.createHmac('sha256', key).update(msg).digest('base64');

console.log('Msg: "%s" MAC: %s', msg, hmac);

