var express = require('express');
var cors = require('cors');
var valid = require('./validator');

var app = express()
  .use(express.logger('dev'))
  .use(authenticator)
  .use(cors());

app.get('/', function(req, res) { res.send('Hello!'); });

var tokenRegex = /^\s*token\s+/i;
function authenticator(req, res, next) {
  var auth = req.header('Authorization');
  
  if (! auth)
    return res.send(401, 'Missing Authorization header');

  if (! tokenRegex.test(auth))
    return res.send(401, 'Invalid Authorization scheme');

  var token = auth.replace(tokenRegex, '');
  if (! valid(token))
    return res.send(401, 'Invalid Authorization');

  next();
}

app.listen(9000);

