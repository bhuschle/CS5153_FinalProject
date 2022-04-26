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

function addProduct(name, price, description = "") {
  knex(productsTableName)
    .insert({
      prod_name: name,
      price: price,
      prod_descr: description,
      prod_img: image,
      prod_alt_txt: altText,
    })
    .then(() => {});
}

module.exports.addProduct = addProduct;

function removeProduct(id) {
  knex(productsTableName)
    .where({
      id: id,
    })
    .del()
    .then(() => {});
}

module.exports.removeProduct = removeProduct;

function addUser(
  firstName,
  lastName,
  emailAddress,
  password,
  address,
  city,
  state,
  country,
  zipCode
) {
  knex(usersTableName)
    .insert({
      first_name: firstName,
      last_name: lastName,
      email: emailAddress,
      user_password: password,
      user_address: address,
      user_city: city,
      user_state: state,
      user_country: country,
      user_zip_code: zipCode,
    })
    .then(() => {});
}

module.exports.addUser = addUser;

function removeUser(id) {
  knex(usersTableName)
    .del()
    .where({
      id: id,
    })
    .then(() => {});
}

module.exports.removeUser = removeUser;
