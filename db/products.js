module.exports = (function(){
  var products = [];
  var counter = 0;
  var keys = [];


  function _add( obj ) {
    if( products.every( function( element ) {
      return element.name !== obj.name;
    })) {
      obj.id = ++counter;
      products.push( obj );
      keys.push(obj.name);
      return products;
    }
  }

  function _getByName( name ) {
    for( var k = 0; k < products.length; k++ ) {
      if( products[k].name === name ) {
        return products[k];
      }
    }
  }

  function _getById( number ) {
    for( var k = 0; k < products.length; k++ ) {
      if( products[k].id === number ) {
        return products[k];
      }
    }
  }

  function _editByName( obj ) {
    var changeIt = this.getByName( obj.name );
    for( var key in obj ) {
      changeIt[key] = obj[key];
    }
    return changeIt;
  }

  function _editById( obj ) {
    var changeIt = this.getById( obj.id );
    for( var key in obj ) {
      changeIt[key] = obj[key];
    }
    return changeIt;
  }

  return {
    products: products,
    keys: keys,
    add: _add,
    getByName: _getByName,
    editByName: _editByName
  };
})();
