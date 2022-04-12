const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'db',
      port : 3306,
      user : 'server',
      password : 'qwertyuiop',
      database : 'store'
    }
});


function addProduct(name, price, description = "") {
    knex('products')
        .insert({
            product_name: name,
            price: price,
            product_description: description
        }).then(()=>{})
}

module.exports.addProduct = addProduct;


function removeProduct(id) {
    knex('products')
        .del()
        .where({
          'id': id
        }).then(()=>{});
}

module.exports.removeProduct = removeProduct;
