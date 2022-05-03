const database = require("./js/database.js");
const path = require("path");
const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const port = 8080;

app.engine("html", handlebars.engine());

app.set("view engine", "handlebars");
app.set("views", "./");

const imagePath = "/static/img";
const scriptPath = "/static/js";

app.use(imagePath, express.static("img"));
app.use(scriptPath, express.static("js"));

const v1UrlPath = "";
const v2UrlPath = "/v2";

const v1ViewsPath = "./pages";
const v2ViewsPath = "./v2";

const v1BaseContext = {
  layout: "./basev1.html",
  imageRoot: imagePath,
  urlRoot: v1UrlPath,
};

const v2BaseContext = {
    imageRoot: imagePath,
    urlRoot: v2UrlPath,
};

// V1 INFORMATION

app.get(`${v1UrlPath}/`, (request, response) => {
  response.render(`${v1ViewsPath}/index.html`, {
    ...v1BaseContext,
    layout: "./basev1.html",
  });
});

app.get(`${v1UrlPath}/account`, (request, response) => {
  response.render(`${v1ViewsPath}/Account.html`, {
    ...v1BaseContext,
    layout: "./basev1.html",
  });
});

app.get(`${v1UrlPath}/cart`, (request, response) => {
  response.render(`${v1ViewsPath}/cart.html`, {
    ...v1BaseContext,
    layout: "./basev1.html",
  });
});

app.get(`${v1UrlPath}/laptops`, async (request, response) => {
  let products = await database.getProducts({ category: "laptops" });

  brands = new Set(products.map((x) => x["brand"]));

  response.render(`${v1ViewsPath}/product.html`, {
    ...v1BaseContext,
    products: products,
    category: "Laptops",
    brands: brands,
  });
});

app.get(`${v1UrlPath}/desktops`, async (request, response) => {
  let products = await database.getProducts({ subcategory: "desktops" });

  brands = new Set(products.map((x) => x["brand"]));

  response.render(`${v1ViewsPath}/product.html`, {
    ...v1BaseContext,
    products: products,
    category: "Desktops",
    brands: brands,
  });
});

app.get(`${v1UrlPath}/tablets`, async (request, response) => {
  let products = await database.getProducts({ subcategory: "tablets" });

  brands = new Set(products.map((x) => x["brand"]));

  response.render(`${v1ViewsPath}/product.html`, {
    ...v1BaseContext,
    products: products,
    category: "Tablets",
    brands: brands,
  });
});

app.get(`${v1UrlPath}/dslr`, async (request, response) => {
  let products = await database.getProducts({ subcategory: "dslr" });

  brands = new Set(products.map((x) => x["brand"]));

  response.render(`${v1ViewsPath}/product.html`, {
    ...v1BaseContext,
    products: products,
    category: "DSLR",
    brands: brands,
  });
});

app.get(`${v1UrlPath}/pointshoot`, async (request, response) => {
  let products = await database.getProducts({ subcategory: "pointshoot" });

  brands = new Set(products.map((x) => x["brand"]));

  response.render(`${v1ViewsPath}/product.html`, {
    ...v1BaseContext,
    products: products,
    category: "Point & Shoot",
    brands: brands,
  });
});

app.get(`${v1UrlPath}/iphone`, async (request, response) => {
  let products = await database.getProducts({ subcategory: "iphone" });

  brands = new Set(products.map((x) => x["brand"]));

  response.render(`${v1ViewsPath}/product.html`, {
    ...v1BaseContext,
    products: products,
    category: "iPhone",
    brands: brands,
  });
});

app.get(`${v1UrlPath}/samsung`, async (request, response) => {
  let products = await database.getProducts({ subcategory: "samsung" });

  brands = new Set(products.map((x) => x["brand"]));

  response.render(`${v1ViewsPath}/product.html`, {
    ...v1BaseContext,
    products: products,
    category: "Samsung",
    brands: brands,
  });
});

app.get(`${v1UrlPath}/movies`, async (request, response) => {
  let products = await database.getProducts({ subcategory: "movies" });

  brands = new Set(products.map((x) => x["brand"]));

  response.render(`${v1ViewsPath}/product.html`, {
    ...v1BaseContext,
    products: products,
    category: "Movies",
    brands: brands,
  });
});

app.get(`${v1UrlPath}/music`, async (request, response) => {
  let products = await database.getProducts({ subcategory: "music" });

  brands = new Set(products.map((x) => x["brand"]));

  response.render(`${v1ViewsPath}/product.html`, {
    ...v1BaseContext,
    products: products,
    category: "Music",
    brands: brands,
  });
});

// V2 INFORMATION

app.get(`${v2UrlPath}`, (request, response) => {
    response.render(
        `${v2ViewsPath}/index.html`,
        {
            ...v2BaseContext,
            layout: './basev2.html',
        }
    );
});

app.get(`${v2UrlPath}/account`, (request, response) => {
  response.render(`${v2ViewsPath}/Account.html`, { layout: false });
});

app.get(`${v2UrlPath}/cart`, (request, response) => {
  response.render(`${v2ViewsPath}/cartV2.html`, { layout: false });
});

app.get(`${v2UrlPath}/computers`, async (request, response) => {
  let products = await database.getProducts({ subcategory: "computers" });

  brands = new Set(products.map((x) => x["brand"]));
    response.render(
        `${v2ViewsPath}/productpageV2.html`,
        {
            ...v2BaseContext,
            layout: './basev2.html',
            products: products,
            category: "Computers",
            brands: brands,
        }
    );
});

app.get(`${v2UrlPath}/iphone`, async (request, response) => {
  let products = await database.getProducts({ subcategory: "iphone" });

  brands = new Set(products.map((x) => x["brand"]));
    response.render(
        `${v2ViewsPath}/productpageV2.html`,
        {
            ...v2BaseContext,
            layout: './basev2.html',
            products: products,
            category: "iPhone",
            brands: brands,
        }
    );
});

app.get(`${v2UrlPath}/samsung`, async (request, response) => {
  let products = await database.getProducts({ subcategory: "samsung" });

  brands = new Set(products.map((x) => x["brand"]));
    response.render(
        `${v2ViewsPath}/productpageV2.html`,
        {
            ...v2BaseContext,
            layout: './basev2.html',
            products: products,
            category: "Samsung",
            brands: brands,
        }
    );
});

app.get(`${v2UrlPath}/product`, (request, response) => {
  response.render(`${v2ViewsPath}/product.html`, { layout: false });
});

app.get(`${v2UrlPath}/tablets`, async (request, response) => {
  let products = await database.getProducts({ subcategory: "tablets" });

  brands = new Set(products.map((x) => x["brand"]));
    response.render(
        `${v2ViewsPath}/productpageV2.html`,
        {
            ...v2BaseContext,
            layout: './basev2.html',
            products: products,
            category: "Tablets",
            brands: brands,
        }
    );
});

app.get(`${v2UrlPath}/laptops`, async (request, response) => {
  let products = await database.getProducts({ subcategory: "laptops" });

  brands = new Set(products.map((x) => x["brand"]));
    response.render(
        `${v2ViewsPath}/productpageV2.html`,
        {
            ...v2BaseContext,
            layout: './basev2.html',
            products: products,
            category: "Laptops",
            brands: brands,
        }
    );
});

app.get(`${v2UrlPath}/locations`, (request, response) => {
    response.render(
        `${v2ViewsPath}/locationsV2.html`,
        {
            ...v2BaseContext,
            layout: false,
        }
    )
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
