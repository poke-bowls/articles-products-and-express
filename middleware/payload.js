var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var router = express.Router();

//router.use( productsMiddleware );
//use syntax to call middleware module

var productsMiddleware = module.exports = (function(req, res, next){

  router.post( '/products', function( req, res, next ) {
    if( !(req.body.hasOwnProperty( 'name')) || !(req.body.hasOwnProperty( 'price')) || !(req.body.hasOwnProperty( 'inventory' ))) {
      res.send( "Confirm input includes the keys 'name', 'price' and 'inventory'." );
      return;
    }
    if(( typeof req.body.name) !== 'string' || ( typeof parseInt(req.body.price) !== 'number' || ( typeof parseInt(req.body.inventory)) !== 'number' )) {
      res.send( "Confirm keys 'name', 'price' and 'inventory' have values of the type 'string', 'string' and 'number', respectively." );
    }
    next();
  });

  router.put( '/products/:id', function( req, res, next ) {
    if( !(req.body.hasOwnProperty( 'name')) || !(req.body.hasOwnProperty( 'price')) || !(req.body.hasOwnProperty( 'inventory' ))) {
      res.send( "Confirm input includes the keys 'name', 'price' and 'inventory'." );
      return;
    }
    if(( typeof req.body.name) !== 'string' || ( typeof parseInt(req.body.price) !== 'number' || ( typeof parseInt(req.body.inventory)) !== 'number' )) {
      res.send( "Confirm keys 'name', 'price' and 'inventory' have values of the type 'string', 'string' and 'number', respectively." );
    }
    next();
  });

}());