var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var articlesMod = require( './../db/articles.js' );
var articlesMiddleware = require( './../middleware/articlesPayload' );
var db = require( './../articles_products.js' );

router.use(bodyParser.urlencoded({ extended : true }));

router.use( articlesMiddleware );

router.route('/')
  .get(function(req, res){
    articlesMod.all()
    .then(function(data){
      res.render('articles/index', {
        articles : data
      });
    })
    .catch(function(err){
      res.send(err);
    });
  })
  .post(function(req, res){
      articlesMod.add( req.body )
      .then(function(data){
        res.redirect('/');
        // res.render('articles/index', {
        //   articles : data
        // });
      })
      .catch(function(err){
        console.log(err, 'Must have unique title');
      });
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