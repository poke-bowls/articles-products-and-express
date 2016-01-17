module.exports = (function(){
  var articles = [{
    title: "fat cat",
    urlTitle: 1
  },
    {title: "fat cat",
    urlTitle: 2},
    {title: "fat cat",
    urlTitle: 3}];
  var counter = 0;
  var keys = [];
  function _all(){
    return articles;
  }

  function _add( obj ) {
    if( articles.every( function( element ) {
      return element.title !== obj.title;
    })) {
      obj.urlTitle = ++counter;
      articles.push( obj );
      keys.push(obj.title);
      return articles;
    }
  }

  function _getByTitle( title ) {
    for( var k = 0; k < articles.length; k++ ) {
      if( articles[k].title === title ) {
        return articles[k];
      }
    }
  }

  function _getByUrlTitle( number ) {
    for( var k = 0; k < articles.length; k++ ) {
      if( articles[k].UrlTitle === number ) {
        return articles[k];
      }
    }
  }

  function _editByTitle( obj ) {
    var changeIt = this.getByTitle( obj.title );
    for( var key in obj ) {
      changeIt[key] = obj[key];
    }
    return changeIt;
  }

  function _editByUrlTitle( obj ) {
    var changeIt = this.getByUrlTitle( obj.UrlTitle );
    for( var key in obj ) {
      changeIt[key] = obj[key];
    }
    return changeIt;
  }

  function _deleteByUrlTitle( number ) {
    articles.splice(articles.indexOf(this.getByUrlTitle(number), 1));
  }

  return {
    all: _all,
    keys: keys,
    add: _add,
    getByTitle: _getByTitle,
    editByTitle: _editByTitle,
    getByUrlTitle: _getByUrlTitle,
    editByUrlTitle: _editByUrlTitle,
    deleteByUrlTitle: _deleteByUrlTitle
  };
})();
