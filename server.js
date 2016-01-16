var express = require('express');
var app = express();
var bodyParser = require('body-parser');

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
