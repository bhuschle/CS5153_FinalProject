const database = require("./js/database.js");
const path = require("path");
const express = require("express");
const handlebars = require('express-handlebars');
const app = express();
const port = 8080;


app.engine('html', handlebars.engine());

app.set('view engine', 'handlebars');
app.set('views', './pages');

app.use("/static/img", express.static("img"));
app.use("/static/js", express.static("js"));


app.get("/", (request, response) => {
    response.render('indexv2.html', {layout: false});
});

app.get("/accessories", (request, response) => {
    response.render('Accesories.html', {layout: false});
});

app.get("/account", (request, response) => {
    response.render('Account.html', {layout: false});
});

app.get("/cart", (request, response) => {
    response.render('cart.html', {layout: false});
});

app.get("/computers", (request, response) => {
    response.render('Computers.html', {layout: false});
});

app.get("/phones", (request, response) => {
    response.render('Phones.html', {layout: false});
});

app.get("/product", (request, response) => {
    response.render('product.html', {layout: false});
});

app.get("/tablets", (request, response) => {
    response.render('Tablets.html', {layout: false});
});



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
