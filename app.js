'use strict';

var express                   = require('express');
var routes                    = require('./routes');
var getPhilosophy             = require('./routes/getPhilosophy');
var getPhilosophyByRandomData = require('./routes/getPhilosophyByRandomData');
var http                      = require('http');
var path                      = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 8000);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/getPhilosophy', getPhilosophy.getPhilosophy);
app.get('/getPhilosophyByRandomData', getPhilosophyByRandomData.getPhilosophyByRandomData);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
