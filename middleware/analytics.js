var fs = require('fs');
var moment = require('moment');


module.exports = function(req, res, next){
  var date = moment().format("MMM Do YYYY").split(" ").join("_");
  fs.readdir('./logs', function(err, files){
    console.log(date, files);
    if(files.indexOf(date + '.log') === -1 || files === undefined){
      fs.writeFile('./logs/' + date + ".log",
       (req.method + " " + req.path + " " +  moment().format('MMMM Do YYYY, h:mm:ss a') + " " +  JSON.stringify(req.headers) + "\n\n"),
      function(err){
        if(err) console.log(err);
      });
    } else {
      fs.appendFile('./logs/' + date + ".log",
        (req.method + " " + req.path + " " +  moment().format('MMMM Do YYYY, h:mm:ss a') + " " +  JSON.stringify(req.headers) + "\n\n"),
        function(err){
          console.log(req.headers);
          console.log("request logged");
        });
    }
    next();
  });

};