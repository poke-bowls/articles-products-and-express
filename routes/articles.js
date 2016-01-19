var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var articlesMod = require( './../db/articles.js' );
var articlesMiddleware = require( './../middleware/articlesPayload' );

router.use(bodyParser.urlencoded({ extended : true }));

router.use( articlesMiddleware );

router.route('/')
  .get(function(req, res){
    res.render('articles/index', {
      articles : articlesMod.all()
    });
  })
  .post(function(req, res){
    if(articlesMod.getByTitle(req.body.title) === undefined){
      articlesMod.add( req.body );
      res.send({ "success": true });
    } else {
      res.send({ "success": false });
    }
  });

router.route('/:title')
  .put( function( req, res ) {
    for( var k = 0; k < articlesMod.all().length; k++ ) {
      if( parseInt(req.params.id) === articlesMod.all()[k].id ) {
        for( var keys in req.body ) {
          articlesMod.all()[k][keys] = req.body[keys];
        }
        return res.send( { 'success' : true } );
      }
    }
    res.send( { 'success' : false } );
  })

  .delete( function(req, res){
    if(articlesMod.all().indexOf(articlesMod.getById(parseInt(req.params.title))) !== -1){
      articlesMod.deleteById(req.params.id);
      res.send({'success': true});
    } else {
      res.send({'success': false});
    }
  });

router.route('/:title/edit')
  .get(function(req, res){
    res.render('articles/edit', {
      articles : articlesMod.getByTitle(req.params.title)
    });
  });

router.route('/new')
  .get(function(req, res){
    res.render('articles/new');
  });

module.exports = router;