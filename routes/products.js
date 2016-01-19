var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var productMod = require( './../db/products.js' );
var productsMiddleware = require( './../middleware/productsPayload' );

router.use(bodyParser.urlencoded({ extended : true }));

function bodyReqinTransformerBrah( req, res, next ) {
  for( var keys in req.body ) {
    if( keys !== 'name' ) {
      req.body[keys] = parseFloat( req.body[keys] );
    }
  }
  next();
}

router.use( productsMiddleware );

router.route('/')
  .get(function(req, res){
    res.render('products/index', {
      products : productMod.all()
    });
  })
  .post(function(req, res){
    if(productMod.keys.indexOf(req.body.name) === -1){

      productMod.add( req.body );

      res.send({ "success": true });
    } else {
      res.send({ "success": false });
    }
  });

router.route('/:id')
  .put( bodyReqinTransformerBrah, function( req, res ) {
    for( var k = 0; k < productMod.all().length; k++ ) {
      if( parseInt(req.params.id) === productMod.all()[k].id ) {
        for( var keys in req.body ) {
          productMod.all()[k][keys] = req.body[keys];
        }
        return res.send( { 'success' : true } );
      }
    }
    res.send( { 'success' : false } );
  })
  .delete( function(req, res){
    if(productMod.all().indexOf(productMod.getById(parseInt(req.params.id))) !== -1){
      productMod.deleteById(req.params.id);
      res.send({'success': true});
    } else {
      res.send({'success': false});
    }
  });

router.route('/:id/edit')
  .get(function(req, res){
    res.render('products/edit', {
      product : productMod.getById(parseInt(req.params.id))
    });
  });

router.route('/new')
  .get(function(req, res){
    res.render('products/new');
  });

module.exports = router;