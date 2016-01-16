var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var productMod = require( './db/products.js' );

var obj = {
  name: 'potato wedges',
  price: 0.99
};

var myObj = {
  name: 'potato wedges',
  price: 0.49,
  crispy: false,
};

console.log(productMod.add( obj ));
console.log( productMod.getByName( 'potato wedges' ) );
console.log( productMod.editByName( myObj ) );

app.use(bodyParser.urlencoded({ extended : true }));

app.post('/products', function(req, res){
  if(products.indexOf(req.body) === -1){
    req.body.id = products.length + 1;
    products.push(req.body);
    res.send({ "success": true });
    console.log(products);
  } else {
    res.send({ "success": false });
  }
});

app.set('views', './templates');
app.set('view engine', 'jade');

var server = app.listen(7777, function(){
  console.log("server listening at ", server.address());
});
