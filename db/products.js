var db = require('./../articles_products.js');

module.exports = (function(){
  var products = [{
  //   name: "fat cat",
  //   price: 5000,
  //   inventory: 3,
  //   id: 1
  // },
  // {
  //   name: "fat child",
  //   price: 1000,
  //   inventory:1,
  //   id: 2
  // },
  // {
  //   name: "fat meatwad",
  //   price: 20,
  //   inventory: 50,
  //   id: 3
  }];
  var keys = [];
  function _all(){
    return new Promise(function( resolve, reject ){
      db.query( 'select * from products' )
      .then( resolve )
      .catch( reject );
    });
  }

  function _add( obj ) {
    // if( products.every( function( element ) {
    //   return element.name !== obj.name;
    // })) {
    //   obj.id = ++counter;
    //   products.push( obj );
    //   keys.push(obj.name);
    //   return products;
    // }
    var name = obj.name;
    var price = obj.price;
    var inventory = obj.inventory;
    return new Promise(function( resolve, reject ){
      db.one( 'insert into products (id, name, price, inventory) values(default, $1, $2, $3) returning id', [name, price, inventory])
       .then(resolve)
      .catch(reject);
    });
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

  function _deleteById( number ) {
    products.splice(products.indexOf(this.getById(number), 1));
  }

  return {
    all: _all,
    keys: keys,
    add: _add,
    getByName: _getByName,
    editByName: _editByName,
    getById: _getById,
    editById: _editById,
    deleteById: _deleteById
  };
})();
