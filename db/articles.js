var db = require('./../articles_products.js');

module.exports = (function(){
  var articles = [{
  //   title: "fat cat",
  //   author: "Dr. Seuss",
  //   urlTitle: 1
  // },
  //   {title: "fat cat",
  //   author: "Dr. Seuss",
  //   urlTitle: 2},
  //   {title: "fat cat",
  //   author: "Dr. Seuss",
  //   urlTitle: 3
  }];

  var _all = function(){
    return new Promise(function( resolve, reject ){
      db.query( 'select * from articles' )
      .then( resolve )
      .catch( reject );
    });
  };

  function _add( obj ) {
    // if( articles.every( function( element ) {
    //   return element.title !== obj.title;
    // })) {
    //   obj.urlTitle = encodeURIComponent( obj.title );
    //   articles.push( obj );
    //   return articles;
    // }
    var title = obj.title;
    var body = obj.body;
    var author = obj.author;
    var urlTitle = encodeURIComponent( obj.title );
    return new Promise(function( resolve, reject ){
      db.one( 'insert into articles (id, title, body, author, urlTitle) values(default, $1, $2, $3, $4 ) returning id', [title, body, author, urlTitle])
       .then(resolve)
      .catch(reject);
    });
  }

  // function _getByTitle( title ) {
  //   return new Promise(function( resolve, reject ){
  //     db.query( 'select * from articles where title = "' + title + '"' )
  //     .then(resolve)
  //     .catch(reject);
  //     });
  // }

  // function _getByUrlTitle( number ) {
  //   for( var k = 0; k < articles.length; k++ ) {
  //     if( articles[k].UrlTitle === number ) {
  //       return articles[k];
  //     }
  //   }
  // }

  function _editByTitle( obj ) {
    var changeIt = this.getByTitle( obj.title );
    for( var key in obj ) {
      changeIt[key] = obj[key];
    }
    return changeIt;
  }

  // function _editByUrlTitle( obj ) {
  //   var changeIt = this.getByUrlTitle( obj.UrlTitle );
  //   for( var key in obj ) {
  //     changeIt[key] = obj[key];
  //   }
  //   return changeIt;
  // }

  function _deleteByUrlTitle( number ) {
    articles.splice(articles.indexOf(this.getByUrlTitle(number), 1));
  }

  return {
    all: _all,
    add: _add,
    // getByTitle: _getByTitle,
    editByTitle: _editByTitle,
    // getByUrlTitle: _getByUrlTitle,
    // editByUrlTitle: _editByUrlTitle,
    deleteByUrlTitle: _deleteByUrlTitle
  };
})();