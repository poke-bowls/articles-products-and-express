module.exports = function (req, res, next){
  if (req.headers.version !== '1.0'){
    res.send({ "error": "require version 1.0"});
  } else {
    next();
  }

};