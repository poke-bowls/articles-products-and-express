var fs = require('fs');
var moment = require('moment');


module.exports = (function(req, res, next){
  console.log(req.method + " " + req.path + " " + Date.now());
}());