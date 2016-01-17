var express = require('express');
var app = express();

//Middleware


//Middleware Router here


app.set('views', './templates');
app.set('view engine', 'jade');

app.use('/products', require('./routes/products.js'));
app.use('/articles', require('./routes/articles.js'));

var server = app.listen(7777, function(){
  console.log("server listening at ", server.address());
});
