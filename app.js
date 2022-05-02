const database = require("./js/database.js");
const path = require("path");
const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const port = 8080;


app.engine("html", handlebars.engine());

app.set('view engine', 'handlebars');
app.set('views', './');

const imagePath = "/static/img";
const scriptPath = "/static/js";

app.use(imagePath, express.static("img"));
app.use(scriptPath, express.static("js"));


const v1UrlPath = "";
const v2UrlPath = "/v2";

const v1ViewsPath = "./pages";
const v2ViewsPath = "./v2";

const v2BaseContext = {
    layout: './basev2.html',
    imageRoot: imagePath,
    urlRoot: v2UrlPath,
};


app.get(`${v1UrlPath}/`, (request, response) => {
    response.render(`${v1ViewsPath}/indexv2.html`, {layout: false});
});

app.get(`${v1UrlPath}/accessories`, (request, response) => {
    response.render(`${v1ViewsPath}/Accesories.html`, {layout: false});
});

app.get(`${v1UrlPath}/account`, (request, response) => {
    response.render(`${v1ViewsPath}/Account.html`, {layout: false});
});

app.get(`${v1UrlPath}/cart`, (request, response) => {
    response.render(`${v1ViewsPath}/cart.html`, {layout: false});
});

app.get(`${v1UrlPath}/computers`, (request, response) => {
    response.render(`${v1ViewsPath}/Computers.html`, {layout: false});
});

app.get(`${v1UrlPath}/phones`, (request, response) => {
    response.render(`${v1ViewsPath}/Phones.html`, {layout: false});
});

app.get(`${v1UrlPath}/product`, (request, response) => {
    response.render(`${v1ViewsPath}/product.html`, {layout: false});
});

app.get(`${v1UrlPath}/tablets`, (request, response) => {
    response.render(`${v1ViewsPath}/Tablets.html`, {layout: false});
});


app.get(`${v2UrlPath}`, (request, response) => {
    response.render(
        `${v2ViewsPath}/index.html`,
        {
            ...v2BaseContext,
            layout: './basev2.html',
        }
    );
});

app.get(`${v2UrlPath}/accessories`, async (request, response) => {
    let category = 'Accessories'
    let products = await database.getProducts({category: category});

    brands = new Set(products.map(x => x['brand']));

    response.render(
        `${v2ViewsPath}/productpageV2.html`,
        {
            ...v2BaseContext,
            products: products,
            category: category,
            brands: brands,
        }
    );
});

app.get(`${v2UrlPath}/account`, (request, response) => {
    response.render(`${v2ViewsPath}/Account.html`, {layout: false});
});

app.get(`${v2UrlPath}/cart`, (request, response) => {
    response.render(`${v2ViewsPath}/cartV2.html`, {layout: false});
});

app.get(`${v2UrlPath}/computers`, async (request, response) => {
    let category = 'Computers'
    let products = await database.getProducts({category: category});

    brands = new Set(products.map(x => x['brand']));

    response.render(
        `${v2ViewsPath}/productpageV2.html`,
        {
            ...v2BaseContext,
            products: products,
            category: category,
            brands: brands,
        }
    );
});

app.get(`${v2UrlPath}/phones`, async (request, response) => {
    let category = 'Phones'
    let products = await database.getProducts({category: category});

    brands = new Set(products.map(x => x['brand']));

    response.render(
        `${v2ViewsPath}/productpageV2.html`,
        {
            ...v2BaseContext,
            products: products,
            category: category,
            brands: brands,
        }
    );
});

app.get(`${v2UrlPath}/product`, (request, response) => {
    response.render(`${v2ViewsPath}/product.html`, {layout: false});
});

app.get(`${v2UrlPath}/tablets`, async (request, response) => {
    let category = 'Tablets'
    let products = await database.getProducts({category: category});

    brands = new Set(products.map(x => x['brand']));

    response.render(
        `${v2ViewsPath}/productpageV2.html`,
        {
            ...v2BaseContext,
            products: products,
            category: category,
            brands: brands,
        }
    );
});

app.get(`${v2UrlPath}/laptops`, async (request, response) => {
    let category = 'Laptops'
    let products = await database.getProducts({category: category});

    brands = new Set(products.map(x => x['brand']));

    response.render(
        `${v2ViewsPath}/productpageV2.html`,
        {
            ...v2BaseContext,
            products: products,
            category: category,
            brands: brands,
        }
    );
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
