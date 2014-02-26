
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var cookie = require('cookie');
var nano = require('nano')('http://admin:password@localhost:5984');
var _users = nano.use('_users');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// create a new user
var dummy = {
  name: 'john',
  password: 'secret',
  roles: [],
  type: 'user'
};

// add dummy user to db
_users.insert(dummy, 'org.couchdb.user:john', function(err, body) {
  if (err) console.log(err);
  console.log(body);
});

app.get('/', function(req, res) {

  // get session for dummy user
  nano.auth('john', 'secret', function(err, body, headers) {
    if (err) console.log(err);
    
    // parse cookie
    var cookies = cookie.parse(headers['set-cookie'][0]);
    res.cookie('AuthSession', cookies.AuthSession);
    
    // set cookie for client
    res.render('index', { title: 'Express' });
  });

});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
