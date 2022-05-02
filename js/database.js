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
const ordersTableName = "orders";
const orderItemsTableName = "order_items";


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

async function getProducts(name = null, priceRange = null, category = null, brand = null) {
    let products = knex(productsTableName);

    if (name !== null) {
        products = products.whereILike('product_name', `%${name}%`);
    }

    if (category !== null) {
        products = products.whereILike('category', `%${category}%`);
    }

    if (brand !== null) {
        products = products.whereILike('brand', `%${brand}%`);
    }

    if (priceRange !== null) {
        products = products.whereBetween(
            'price', priceRange
        );
    }
    
    return products.then(function(r) {
        return JSON.parse(JSON.stringify(r));
    });
}

module.exports.getProducts = getProducts;


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

async function editUser(id, firstName, lastName, emailAddress, password, address, city, state, country, zipCode) {
    await knex(usersTableName)
    .where({ 'id': id })
    .update({
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

module.exports.editUser = editUser;

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


async function addOrder(userId, items) {
    let orderId = await knex(ordersTableName)
    .insert({
        user_id_: userId,
    })
    .then((row) => JSON.parse(JSON.stringify(row))[0]);

    if (items.length > 0) {
        items.forEach(element => {
            element["order_id"] = orderId;
        });

        await knex(orderItemsTableName)
        .insert(items);
    }
}

module.exports.addOrder = addOrder;


async function getOrderById(id) {
    let order = await knex(ordersTableName)
    .where({id: id})
    .first()
    .then((row) => JSON.parse(JSON.stringify(row)));
    
    order['items'] = await knex(orderItemsTableName)
    .where({order_id: id})
    .then((row) => JSON.parse(JSON.stringify(row)));

    return order;
}

module.exports.getOrderById = getOrderById;
