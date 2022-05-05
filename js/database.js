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
  await knex(productsTableName).insert({
    product_name: name,
    price: price,
    product_description: description,
    alt1_text: altText,
  });
}

module.exports.addProduct = addProduct;

async function removeProduct(id) {
  await knex(productsTableName)
    .where({
      id: id,
    })
    .del();
}

module.exports.removeProduct = removeProduct;

async function getProductById(id) {
  let product = knex(productsTableName);

  product = product.where("id", id);

  return await product.first().then((row) => JSON.parse(JSON.stringify(row)));
}

module.exports.getProductById = getProductById;

async function getProducts({
  name = null,
  priceRange = null,
  category = null,
  subcategory = null,
  brands = [],
} = {}) {
  let products = knex(productsTableName);

  if (name !== null) {
    products = products.whereILike("product_name", `%${name}%`);
  }

  if (category !== null) {
    products = products.whereILike("category", `%${category}%`);
  }

  if (subcategory !== null) {
    products = products.whereILike("subcategory", `%${subcategory}%`);
  }

  for (let i = 0; i < brands.length; i += 1) {
    if (i === 0) {
      products = products.whereILike("brand", `%${brands[i]}%`);
    } else {
      products = products.orWhere("products.brand", "like", `%${brands[i]}%`);
    }
  }

  if (priceRange !== null) {
    products = products.whereBetween("price", priceRange);
  }

  return products.then(function (r) {
    return JSON.parse(JSON.stringify(r));
  });
}

module.exports.getProducts = getProducts;

async function getAllProducts() {
  let products = knex(productsTableName);

  return products.then(function (r) {
    return JSON.parse(JSON.stringify(r));
  });
}

module.exports.getAllProducts = getAllProducts;

async function searchProducts(query) {
  let products = knex(productsTableName)
  .whereILike("product_name", `%${query}%`)
  .orWhereILike("category", `%${query}%`)
  .orWhereILike("subcategory", `%${query}%`)
  .orWhereILike("brand", `%${query}%`)
  .orWhereILike("model_number", `%${query}%`)

  return products.then(function (r) {
    return JSON.parse(JSON.stringify(r));
  });
}

module.exports.searchProducts = searchProducts;


async function addUser(
  firstName,
  lastName,
  emailAddress,
  password,
  {
    address = null,
    city = null,
    state = null,
    country = null,
    zipCode = null,
  } = {}
) {
  let u = {
    first_name: firstName,
    last_name: lastName,
    email: emailAddress,
    user_password: password,
  };

  if (address !== null) {
    u["user_address"] = address;
  }
  if (city !== null) {
    u["user_city"] = city;
  }
  if (state !== null) {
    u["user_state"] = state;
  }
  if (country !== null) {
    u["user_country"] = country;
  }
  if (zipCode !== null) {
    u["user_zip_code"] = zipCode;
  }

  await knex(usersTableName).insert(u);
}

module.exports.addUser = addUser;

async function editUser(id, firstName, lastName, emailAddress, address, city, state, country, zipCode, password = null) {
  let u = {
    first_name: firstName,
    last_name: lastName,
    email: emailAddress,
    user_password: password,
    user_address: address,
    user_city: city,
    user_state: state,
    user_country: country,
    user_zip_code: zipCode,
  };

  if (password !== null) {
    u["user_password"] = password;
  }

  await knex(usersTableName).where({ id: id }).update(u);
}

module.exports.editUser = editUser;

async function removeUser(id) {
  await knex(usersTableName).del().where({
    id: id,
  });
}

module.exports.removeUser = removeUser;

async function getUser({ id = null, email = null, password = null } = {}) {
  let user = knex(usersTableName);

  if (id !== null) {
    user = user.where("id", id);
  }

  if (email !== null) {
    user = user.where("email", email);
  }

  if (password !== null) {
    user = user.andWhere("user_password", password);
  }

  return await user.first().then((row) => JSON.parse(JSON.stringify(row)));
}

module.exports.getUser = getUser;

async function addOrder(userId, items) {
  let orderId = await knex(ordersTableName)
    .insert({
      user_id_: userId,
    })
    .then((row) => JSON.parse(JSON.stringify(row))[0]);

  if (items.length > 0) {
    items.forEach((element) => {
      element["order_id"] = orderId;
    });

    await knex(orderItemsTableName).insert(items);
  }
}

module.exports.addOrder = addOrder;

async function getOrderById(id) {
  let order = await knex(ordersTableName)
    .where({ id: id })
    .first()
    .then((row) => JSON.parse(JSON.stringify(row)));

  order["items"] = await knex(orderItemsTableName)
    .where({ order_id: id })
    .then((row) => JSON.parse(JSON.stringify(row)));

  return order;
}

module.exports.getOrderById = getOrderById;

async function addToOrder(name, price) {
  await knex(orderItemsTableName).insert({
    order_name: name,
    order_price: price,
  });
}

module.exports.addToOrder = addToOrder;

async function getOrder({ name = null, price = null } = {}) {
  let order = knex(orderItemsTableName);

  return order.then(function (r) {
    return JSON.parse(JSON.stringify(r));
  });
}

module.exports.getOrder = getOrder;

async function removeOrders() {
  await knex(orderItemsTableName)
    .where(id > 0)
    .del();
}

module.exports.removeOrders = removeOrders;

async function getOrderTotal() {
  let order = await knex(orderItemsTableName);
  let total = 0;

  if (order.length > 0) {
    order.forEach((element) => {
      total = total + element["price"];
    });
  }

  return total;
}
module.exports.getOrderTotal = getOrderTotal;
