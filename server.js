var express = require('express');
var app = express();
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var fs = require('fs');
var moment = require('moment');
var db = require('./articles_products.js');

//select all of our users from the DB
// db.query("select * from articles", true)
//     .then(function (data) {
//         // success;
//         console.log( data );
//     })
//     .catch(function (error) {
//         // error;
//     });

//sample insert
// db.one("insert into products(id, name, price, inventory) values( default, $1, $2, $3) returning id",
//     ['poopoopants', 100.00, 100])
//     .then(function (data) {
//         console.log(data.id); // print new user id;
//     })
//     .catch(function (error) {
//         console.log("ERROR:", error); // print error;
//     });

// delete all inactive users;
// db.result("delete from users where id = 50001", false)
//     .then(function (result) {
//         console.log(result.rowCount); // print how many records were deleted;
//     })
//     .catch(function (error) {
//         console.log("ERROR:", reason); // print error;
//     });

app.use(bodyParser.urlencoded({ extended : true }));

//Middleware
// app.use( express.static( 'public' ) );

app.set('views', './templates');
app.set('view engine', 'jade');

app.use( methodOverride(function( req, res ) {
  // if( req.body && typeof req.body === 'object' && '_method' in req.body ) {
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