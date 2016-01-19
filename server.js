var express = require('express');
var app = express();
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var fs = require('fs');
var moment = require('moment');
app.use(bodyParser.urlencoded({ extended : true }));

//Middleware
// app.use( express.static( 'public' ) );

app.set('views', './templates');
app.set('view engine', 'jade');

app.use( methodOverride(function( req, res ) {
  // if( req.body && typeof req.body === 'object' && '_method' in req.body ) {
    console.log( 'sup', req.body );
    var method = req.body._method;
    delete req.body._method;
    return method;
  // }
}));

app.use(require('./middleware/analytics.js'));

app.use(require('./middleware/do-not-track-check.js'));

app.use('/products', require('./routes/products.js'));
app.use('/articles', require('./middleware/check_article_version.js'), require('./routes/articles.js'));

var server = app.listen(7777, function(){
  console.log("server listening at ", server.address());
});
