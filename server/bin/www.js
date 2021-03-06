#!/usr/bin/env node

process.env.NODE_ENV = 'production'
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
require('dotenv').config()

global.async = require("async");
global.await = require("async").await;
global._ = require('lodash');

global.Constant = require('../Constant')
global.AppClass = require('../class/AppClass')
global.HelperClass = require('../class/HelperClass')
global.ResponseHelper = require('../class/ResponseHelper')

// EVENT EMITTER WITH HOOK
var EventEmitter = require('events').EventEmitter;
global.EVENTEMITTER = new EventEmitter();

global.DS = process.platform=="darwin" ? "/" : "\\";
global.APP_SECRET = process.env.APP_SECRET || "81F44FB42275569BF89A1946CC631"
global.APP_URL = process.env.APP_URL || "http://127.0.0.1:3000"
global.DIR_DIST = process.env.DIR_DIST || "."
global.DIR_TEMP = `${DIR_DIST}${DS}temp`
global.DIR_BACKUP = `${DIR_DIST}${DS}backup`
global.DIR_LOG = `${DIR_DIST}${DS}log`
global.LOGFILE_APP = `${DIR_LOG}${DS}app.log`
global.DIR_MONGODB = `${DIR_DIST}${DS}mongodb`
global.DIR_MONGODB_DATA = `${DIR_MONGODB}${DS}data`
global.APP_NWJS_START_FILE = process.env.APP_NWJS_START_FILE || `${DIR_DIST}${DS}London BetExchange.exe`


// console.log(DIR_DIST)

global.MONGO_DB_URI = 'mongodb://127.0.0.1:27017/ckdb';;

// Iniit Empty Mongoose Connection so we can create shcemas
global.db = mongoose.connection
autoIncrement.initialize(db);

// Init App Default Functions required to run the app
AppClass.init()
global.Logger = AppClass.logger()

process.on('uncaughtException', function (err) {
  console.log(err)
  Logger.error('uncaughtException', { message : err.message, stack : err.stack, exit: true  }); // logging with MetaData
  setTimeout(function () {
     process.exit(1); // exit with failure
  },1000);
});



/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('express-app:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);

  console.log(app.get('env'))
  if ( app.get('env') === 'production' ) {
    // AppClass.startMongoDBServer()
  }
}



// LIVE RELOAD NODE WEBKIT
// https://github.com/nwjs/nw.js/wiki/Livereload-nw.js-on-changes
// var path = './';
// var fs = require('fs');
// console.log(path)
// var reloadWatcher=fs.watch(path,{ recursive: true }, function() {
//   location.reload();
//   reloadWatcher.close();
// });
