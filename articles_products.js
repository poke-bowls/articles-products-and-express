//configure database connection
var cn = {
  host : 'localhost', //default server name
  port : 5432, //default port for psql
  database : 'articles_products', //database you are connecting to, change this
  user : 'mick'
};

var promise = require( 'bluebird' );
var options = {
  promiselib : promise
  // default promise library
};
var pgp = require( 'pg-promise' )( options );

var db = pgp( cn );

module.exports = db;