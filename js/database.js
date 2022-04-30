const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "db",
    port: 3306,
    user: "server",
    password: "qwertyuiop",
    database: "store",
  },
});

const productsTableName = "products";
const usersTableName = "users";


async function addProduct(name, price, description = "", altText = "") {
    await knex(productsTableName)
    .insert({
        product_name: name,
        price: price,
        product_description: description,
        alt_text: altText,
    });
}

module.exports.addProduct = addProduct;

async function removeProduct(id) {
    await knex(productsTableName)
        .where({
          'id': id
    })
    .del();
}

module.exports.removeProduct = removeProduct;

async function searchProductsByName(name, priceRange = null) {
    let products = knex(productsTableName)
        .whereILike('product_name', `%${name}%`);

    if (priceRange != null) {
        products = products.whereBetween(
            'price', priceRange
        );
    }
    
    return products.then(function(r) {
        return JSON.parse(JSON.stringify(r));
    });
}

module.exports.searchProductsByName = searchProductsByName;


async function addUser(firstName, lastName, emailAddress, password, address, city, state, country, zipCode) {
    await knex(usersTableName)
        .insert({
            first_name: firstName,
            last_name: lastName,
            email: emailAddress,
            user_password: password,
            user_address: address,
            user_city: city,
            user_state: state,
            user_country: country,
            user_zip_code: zipCode
        });
}

module.exports.addUser = addUser;

async function removeUser(id) {
    await knex(usersTableName)
        .del()
        .where({
            'id': id
        });
}

module.exports.removeUser = removeUser


async function getUserById(id) {
    return knex(usersTableName)
    .where({id: id})
    .first()
    .then((row) => JSON.parse(JSON.stringify(row)));
}

module.exports.getUserById = getUserById;
