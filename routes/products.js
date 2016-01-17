var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var productMod = require( './../db/products.js' );

router.use(bodyParser.urlencoded({ extended : true }));

function bodyReqinTransformerBrah( req, res, next ) {
  for( var keys in req.body ) {
    if( keys !== 'name' ) {
      req.body[keys] = parseFloat( req.body[keys] );
    }
  }
  next();
}

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
      console.log(productMod.products);
    } else {
      res.send({ "success": false });
    }
  });

router.route('/:id')
  .put( bodyReqinTransformerBrah, function( req, res ) {
    for( var k = 0; k < productMod.products.length; k++ ) {
      if( parseInt(req.params.id) === productMod.products[k].id ) {
        for( var keys in req.body ) {
          productMod.products[k][keys] = req.body[keys];
        }
        return res.send( { 'success' : true } );
      }
    }
    res.send( { 'success' : false } );
  })
  .delete( function(req, res){
    if(productMod.products.indexOf(productMod.getById(parseInt(req.params.id))) !== -1){
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

module.exports = router;