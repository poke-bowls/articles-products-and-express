module.exports = function(req, res, next){
  if(req.headers.hasOwnProperty('x-do-not-track')){
    res.send({'What, are you a terrorist?': '...adding to the NSA Terrorist Watch Program'});
  } else {
    next();
  }
};