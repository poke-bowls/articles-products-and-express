var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var productMod = require( './db/products.js' );
// var router = express.Router();

//Middleware
// server.use( '/', router );

function bodyReqinTransformerBrah( req, res, next ) {
  for( var keys in req.body ) {
    if( keys !== 'name' ) {
      req.body[keys] = parseFloat( req.body[keys] );
    }
  }
  next();
}

//Middleware Router here



app.use(bodyParser.urlencoded({ extended : true }));

app.post('/products', function(req, res){
  if(productMod.keys.indexOf(req.body.name) === -1){

    productMod.add( req.body );

    res.send({ "success": true });
    console.log(productMod.products);
  } else {
    res.send({ "success": false });
  }
});

app.put( '/products/:id', bodyReqinTransformerBrah, function( req, res ) {
  for( var k = 0; k < productMod.products.length; k++ ) {
    if( parseInt(req.params.id) === productMod.products[k].id ) {
      for( var keys in req.body ) {
        productMod.products[k][keys] = req.body[keys];
      }
      return res.send( { 'success' : true } );
    }
  }
  res.send( { 'success' : false } );
});

app.set('views', './templates');
app.set('view engine', 'jade');

var server = app.listen(7777, function(){
  console.log("server listening at ", server.address());
});
