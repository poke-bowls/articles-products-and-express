module.exports = (function(){
  var products = [];

  function _add( obj ) {
    if( products.every( function( element ) {
      return element.name !== obj.name;
    })) {
      products.push( obj );
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

  function _editByName( obj ) {
    var changeIt = this.getByName( obj.name );
    for( var key in obj ) {
      changeIt[key] = obj[key];
    }
    return changeIt;
  }

  return {
    products: products,
    add: _add,
    getByName: _getByName,
    editByName: _editByName
  };
})();
