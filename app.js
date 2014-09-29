
/**
 * Module dependencies.
 */

var http = require('http');
var utils = require('./lib/utils');
var express = require('express');
var routes = require('./routes');
var reader = require('recursive-readdir');
var template = require('./routes/template');

var app = express();

path = require('path');
fs = require('fs');
hogan = require('hjs');
s = (process.platform === 'win32') ? '\\' : '/';
_ = require('lodash');

// all environments
app.set('port', process.env.PORT || 9000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
// app.use(express.favicon());
// app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }

var sendJSON = function(res, data) {
  res.statusCode = 200;
  res.setHeader('content-type', 'application/json');
  res.end(data);
};

app.get('/', routes.index);
app.get('/fbID', function(req, res) {
  sendJSON(res, JSON.stringify({ id: 280198648674835 }));
});
app.get('/templates.js', template.serve);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
