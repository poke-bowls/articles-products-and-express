var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var router = express.Router();

var productsMiddleware = module.exports = function (req, res, next) {
    if(req.method === 'POST') {

      if( !(req.body.hasOwnProperty( 'name')) || !(req.body.hasOwnProperty( 'price')) || !(req.body.hasOwnProperty( 'inventory' ))) {
        res.send( "Confirm input includes the keys 'name', 'price' and 'inventory'." );
        return;
      }
      if(( typeof req.body.name) !== 'string' || (isNaN(parseInt(req.body.price)) || ( isNaN(req.body.inventory)))) {
        res.send( "Confirm keys 'name', 'price' and 'inventory' have values of the type 'string', 'string' and 'number', respectively." );
        return;
      }
      req.body.inventory = parseInt( req.body.inventory );
      next();

  } else if( req.method === 'PUT' ) {

    if( !(req.body.hasOwnProperty( 'name')) || !(req.body.hasOwnProperty( 'price')) || !(req.body.hasOwnProperty( 'inventory' ))) {
      res.send( "Confirm input includes the keys 'name', 'price' and 'inventory'." );
      return;
    }
    if(( typeof req.body.name) !== 'string' || ( isNaN(req.body.price) || ( isNaN(req.body.inventory)) )) {
      res.send( "Confirm keys 'name', 'price' and 'inventory' have values of the type 'string', 'string' and 'number', respectively." );
      return;
    }
    req.body.inventory = parseInt( req.body.inventory );
    next();
  }

  next();
};