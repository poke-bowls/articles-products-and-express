var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var router = express.Router();

var articlesMiddleware = module.exports = function (req, res, next) {
    if(req.method === 'POST') {
      if( !(req.body.hasOwnProperty( 'title')) || !(req.body.hasOwnProperty( 'body')) || !(req.body.hasOwnProperty( 'author' ))) {
        res.send( "Confirm input includes the keys 'title', 'body' and 'author'." );
        return;
      }
      if(( typeof req.body.title) !== 'string' || (typeof req.body.body) !== 'string' || (typeof req.body.author !== 'string')) {
        res.send( "Confirm keys 'title', 'body' and 'author' all have values of the type 'string'." );
        return;
      }
      next();

  } else if( req.method === 'PUT' ) {

    if( !(req.body.hasOwnProperty( 'title')) || !(req.body.hasOwnProperty( 'body')) || !(req.body.hasOwnProperty( 'author' ))) {
      res.send( "Confirm input includes the keys 'title', 'body' and 'author'." );
      return;
    }
    if(( typeof req.body.title) !== 'string' || (typeof req.body.title) !== 'string' || (typeof req.body.title) !== 'string' ) {
      res.send( "Confirm keys 'title', 'body' and 'author' all have values of the type 'string'." );
      return;
    }
    next();
  }

  next();
};