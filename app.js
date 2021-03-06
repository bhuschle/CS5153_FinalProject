const database = require("./js/database.js");
const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const handlebars = require("express-handlebars");
const session = require("express-session");
const { syncBuiltinESMExports } = require("module");
const app = express();
const port = 8080;

app.engine("html", handlebars.engine());

app.set("view engine", "handlebars");
app.set("views", "./");
app.set("trust proxy", 1);

const imagePath = "/static/img";
const scriptPath = "/static/js";

app.use(imagePath, express.static("img"));
app.use(scriptPath, express.static("js"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "Well-kept secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const commonUrlPath = "/common";
const v1UrlPath = "";
const v2UrlPath = "/v2";

const v1ViewsPath = "./pages";
const v2ViewsPath = "./v2";

const commonBaseContext = {
  commonUrlRoot: commonUrlPath,
  imageRoot: imagePath,
};

const v1BaseContext = {
  ...commonBaseContext,
  urlRoot: v1UrlPath,
};

const v2BaseContext = {
  ...commonBaseContext,
  urlRoot: v2UrlPath,
};

function sleep(millis) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

function filterAndSort(products, brands, sortBy) {
  products = products.filter((element) => brands.includes(element["brand"]));
  if (sortBy === "Low-to-high") {
    products.sort((a, b) => a["price"] - b["price"]);
  } else if (sortBy === "High-to-low") {
    products.sort((a, b) => b["price"] - a["price"]);
  } else if (sortBy === "Best sellers") {
    products.sort((a, b) => b["sold_count"] - a["sold_count"]);
  }
  return products;
}

// V1 INFORMATION

app.get(`${v1UrlPath}/`, async (request, response) => {
  let products = await database.getAllProducts();
  let macbook = await database.getProductById(4);

  response.render(`${v1ViewsPath}/index.html`, {
    ...v1BaseContext,
    userFirstName: request.session.firstName,
    loggedIn: request.session.loggedIn,
    layout: "./basev1.html",
    prod: products,
    mac: macbook,
  });
});

app.get(`${v1UrlPath}/account`, async (request, response) => {
  let passwordMismatch = request.session.passwordMismatch;
  request.session.passwordMismatch = null;

  let updateSuccess = request.session.updateSuccess;
  request.session.updateSuccess = null;
  let user = await database.getUser({ id: request.session.userId });

  response.render(`${v1ViewsPath}/account.html`, {
    ...v1BaseContext,
    layout: "./basev1.html",
    userFirstName: request.session.firstName,
    loggedIn: request.session.loggedIn,
    user: user,
    passwordMismatch: passwordMismatch,
    updateSuccess: updateSuccess,
  });
});

app.get(`${v1UrlPath}/addtocart`, async (request, response) => {
  let name = request.query["name"];
  let price = request.query["price"];
  if (price != null || name != null) {
    database.addToOrder(name, price);
  }

  const util = require("util");
  const sleep = util.promisify(setTimeout);

  await sleep(2000);

  response.redirect(`${v1UrlPath}/cart`);

  response.render(`${v1ViewsPath}/addtocart.html`, {
    ...v1BaseContext,
    layout: "./auth.html",
  });
});

app.get(`${v1UrlPath}/cart`, async (request, response) => {
  let orders = await database.getOrder();
  let user = await database.getUser({ id: request.session.userId });

  let total = await database.getOrderTotal();

  response.render(`${v1ViewsPath}/cart.html`, {
    ...v1BaseContext,
    userFirstName: request.session.firstName,
    loggedIn: request.session.loggedIn,
    layout: "./basev1.html",
    order: orders,
    user: user,
    total: total,
  });
});

app.get(`${v1UrlPath}/locations`, (request, response) => {
  response.render(`${v1ViewsPath}/locations.html`, {
    ...v1BaseContext,
    layout: "./faqbasev1.html",
  });
});

app.get(`${v1UrlPath}/about`, (request, response) => {
  response.render(`${v1ViewsPath}/aboutus.html`, {
    ...v1BaseContext,
    layout: "./faqbasev1.html",
  });
});

app.get(`${v1UrlPath}/faq`, (request, response) => {
  response.render(`${v1ViewsPath}/faq.html`, {
    ...v1BaseContext,
    layout: "./faqbasev1.html",
  });
});

app.get(`${v1UrlPath}/returnfaq`, (request, response) => {
  response.render(`${v1ViewsPath}/returnfaq.html`, {
    ...v1BaseContext,
    layout: "./faqbasev1.html",
  });
});

app.get(`${v1UrlPath}/shippingfaq`, (request, response) => {
  response.render(`${v1ViewsPath}/shippingfaq.html`, {
    ...v1BaseContext,
    layout: "./faqbasev1.html",
  });
});

app.get(`${v1UrlPath}/accountfaq`, (request, response) => {
  response.render(`${v1ViewsPath}/accountfaq.html`, {
    ...v1BaseContext,
    layout: "./faqbasev1.html",
  });
});

app.get(`${v1UrlPath}/paymentfaq`, (request, response) => {
  response.render(`${v1ViewsPath}/paymentfaq.html`, {
    ...v1BaseContext,
    layout: "./faqbasev1.html",
  });
});

app.get(`${v1UrlPath}/signin`, (request, response) => {
  let signInFailed = request.session.signInFailed;
  request.session.signInFailed = null;
  response.render(`${v1ViewsPath}/signin.html`, {
    ...v1BaseContext,
    layout: "./auth.html",
    signInFailed: signInFailed,
  });
});

app.get(`${v1UrlPath}/signout`, (request, response) => {
  request.session.destroy((error) => {});
  response.render(`${v1ViewsPath}/signedout.html`, {
    ...v1BaseContext,
    layout: "./auth.html",
  });
});

app.get(`${v1UrlPath}/signup`, (request, response) => {
  let passwordMismatch = request.session.passwordMismatch;
  request.session.passwordMismatch = null;
  response.render(`${v1ViewsPath}/createaccount.html`, {
    ...v1BaseContext,
    layout: "./auth.html",
    passwordMismatch: passwordMismatch,
  });
});

app.get(`${v1UrlPath}/signup/success`, (request, response) => {
  response.render(`${v1ViewsPath}/createaccountsucc.html`, {
    ...v1BaseContext,
    layout: "./auth.html",
  });
});

app.get(`${v1UrlPath}/purchasesucc`, (request, response) => {
  database.removeOrders();
  response.render(`${v1ViewsPath}/purchasesucc.html`, {
    ...v1BaseContext,
    layout: "./auth.html",
  });
});

app.get(`${v1UrlPath}/productinfo`, async (request, response) => {
  let product = await database.getProductById(request.query["id"]);

  response.render(`${v1ViewsPath}/productinfo.html`, {
    ...v1BaseContext,
    userFirstName: request.session.firstName,
    loggedIn: request.session.loggedIn,
    layout: "./basev1.html",
    prod: product,
    productsString: JSON.stringify(product),
  });
});

app.get(`${v1UrlPath}/desktops`, async (request, response) => {
  let subcategoryId = "desktops";
  let products = await database.getProducts({ subcategory: subcategoryId });
  brands = new Set(products.map((x) => x["brand"]));

  if (Object.keys(request.query).length !== 0) {
    let filterBrands = Object.keys(request.query);
    delete filterBrands["sortby"];
    products = filterAndSort(products, filterBrands, request.query["sortby"]);
  }

  response.render(`${v1ViewsPath}/product.html`, {
    ...v1BaseContext,
    userFirstName: request.session.firstName,
    loggedIn: request.session.loggedIn,
    layout: "./basev1.html",
    products: products,
    productsString: JSON.stringify(products),
    category: "Computers",
    subcategory: "Desktops",
    subcategoryId: subcategoryId,
    brands: brands,
  });
});

app.get(
  `${v1UrlPath}/tablets`,
  bodyParser.urlencoded(),
  async (request, response) => {
    let subcategoryId = "tablets";
    let products = await database.getProducts({ subcategory: subcategoryId });
    brands = new Set(products.map((x) => x["brand"]));

    if (Object.keys(request.query).length !== 0) {
      let filterBrands = Object.keys(request.query);
      delete filterBrands["sortby"];
      products = filterAndSort(products, filterBrands, request.query["sortby"]);
    }

    response.render(`${v1ViewsPath}/product.html`, {
      ...v1BaseContext,
      loggedIn: request.session.loggedIn,
      layout: "./basev1.html",
      products: products,
      category: "Computers",
      subcategory: "Tablets",
      subcategoryId: subcategoryId,
      brands: brands,
    });
  }
);

app.get(`${v1UrlPath}/laptops`, async (request, response) => {
  let subcategoryId = "laptops";
  let products = await database.getProducts({ subcategory: subcategoryId });
  brands = new Set(products.map((x) => x["brand"]));

  if (Object.keys(request.query).length !== 0) {
    let filterBrands = Object.keys(request.query);
    delete filterBrands["sortby"];
    products = filterAndSort(products, filterBrands, request.query["sortby"]);
  }

  response.render(`${v1ViewsPath}/product.html`, {
    ...v1BaseContext,
    userFirstName: request.session.firstName,
    loggedIn: request.session.loggedIn,
    layout: "./basev1.html",
    products: products,
    productsString: JSON.stringify(products),
    category: "Computers",
    subcategory: "Laptops",
    subcategoryId: subcategoryId,
    brands: brands,
  });
});

app.get(`${v1UrlPath}/dslr`, async (request, response) => {
  let subcategoryId = "dslr";
  let products = await database.getProducts({ subcategory: subcategoryId });
  brands = new Set(products.map((x) => x["brand"]));

  if (Object.keys(request.query).length !== 0) {
    let filterBrands = Object.keys(request.query);
    delete filterBrands["sortby"];
    products = filterAndSort(products, filterBrands, request.query["sortby"]);
  }

  response.render(`${v1ViewsPath}/product.html`, {
    ...v1BaseContext,
    userFirstName: request.session.firstName,
    loggedIn: request.session.loggedIn,
    layout: "./basev1.html",
    products: products,
    productsString: JSON.stringify(products),
    category: "Cameras",
    subcategory: "DSLR",
    subcategoryId: subcategoryId,
    brands: brands,
  });
});

app.get(`${v1UrlPath}/pointshoot`, async (request, response) => {
  let subcategoryId = "pointshoot";
  let products = await database.getProducts({ subcategory: subcategoryId });
  brands = new Set(products.map((x) => x["brand"]));

  if (Object.keys(request.query).length !== 0) {
    let filterBrands = Object.keys(request.query);
    delete filterBrands["sortby"];
    products = filterAndSort(products, filterBrands, request.query["sortby"]);
  }

  response.render(`${v1ViewsPath}/product.html`, {
    ...v1BaseContext,
    userFirstName: request.session.firstName,
    loggedIn: request.session.loggedIn,
    layout: "./basev1.html",
    products: products,
    productsString: JSON.stringify(products),
    category: "Cameras",
    subcategory: "Point & Shoot",
    subcategoryId: subcategoryId,
    brands: brands,
  });
});

app.get(`${v1UrlPath}/iphone`, async (request, response) => {
  let subcategoryId = "iphone";
  let products = await database.getProducts({ subcategory: subcategoryId });
  brands = new Set(products.map((x) => x["brand"]));

  if (Object.keys(request.query).length !== 0) {
    let filterBrands = Object.keys(request.query);
    delete filterBrands["sortby"];
    products = filterAndSort(products, filterBrands, request.query["sortby"]);
  }

  response.render(`${v1ViewsPath}/product.html`, {
    ...v1BaseContext,
    userFirstName: request.session.firstName,
    loggedIn: request.session.loggedIn,
    layout: "./basev1.html",
    products: products,
    productsString: JSON.stringify(products),
    category: "Phones",
    subcategory: "iPhone",
    subcategoryId: subcategoryId,
    brands: brands,
  });
});

app.get(`${v1UrlPath}/samsung`, async (request, response) => {
  let subcategoryId = "samsung";
  let products = await database.getProducts({ subcategory: subcategoryId });
  brands = new Set(products.map((x) => x["brand"]));

  if (Object.keys(request.query).length !== 0) {
    let filterBrands = Object.keys(request.query);
    delete filterBrands["sortby"];
    products = filterAndSort(products, filterBrands, request.query["sortby"]);
  }

  response.render(`${v1ViewsPath}/product.html`, {
    ...v1BaseContext,
    userFirstName: request.session.firstName,
    loggedIn: request.session.loggedIn,
    layout: "./basev1.html",
    products: products,
    productsString: JSON.stringify(products),
    category: "Phones",
    subcategory: "Samsung",
    subcategoryId: subcategoryId,
    brands: brands,
  });
});

app.get(`${v1UrlPath}/movies`, async (request, response) => {
  let subcategoryId = "movies";
  let products = await database.getProducts({ subcategory: subcategoryId });
  brands = new Set(products.map((x) => x["brand"]));

  if (Object.keys(request.query).length !== 0) {
    let filterBrands = Object.keys(request.query);
    delete filterBrands["sortby"];
    products = filterAndSort(products, filterBrands, request.query["sortby"]);
  }

  response.render(`${v1ViewsPath}/product.html`, {
    ...v1BaseContext,
    userFirstName: request.session.firstName,
    loggedIn: request.session.loggedIn,
    layout: "./basev1.html",
    products: products,
    productsString: JSON.stringify(products),
    category: "Music & Movies",
    subcategory: "Movies",
    subcategoryId: subcategoryId,
    brands: brands,
  });
});

app.get(`${v1UrlPath}/music`, async (request, response) => {
  let subcategoryId = "music";
  let products = await database.getProducts({ subcategory: subcategoryId });
  brands = new Set(products.map((x) => x["brand"]));

  if (Object.keys(request.query).length !== 0) {
    let filterBrands = Object.keys(request.query);
    delete filterBrands["sortby"];
    products = filterAndSort(products, filterBrands, request.query["sortby"]);
  }

  response.render(`${v1ViewsPath}/product.html`, {
    ...v1BaseContext,
    userFirstName: request.session.firstName,
    loggedIn: request.session.loggedIn,
    layout: "./basev1.html",
    products: products,
    productsString: JSON.stringify(products),
    category: "Music & Movies",
    subcategory: "Music",
    subcategoryId: subcategoryId,
    brands: brands,
  });
});

app.get(`${v1UrlPath}/signout`, (request, response) => {
  request.session.destroy((error) => {});
  //response.redirect(`${v1UrlPath}/`);
  response.render(`${v1ViewsPath}/signedout.html`, {
    ...v1BaseContext,
    layout: "./authv1.html",
  });
});

app.get(
  `${v1UrlPath}/search`,
  bodyParser.urlencoded(),
  async (request, response) => {
    let query = request.query["query"];
    delete request.query["query"];
    let products = await database.searchProducts(query);
    brands = new Set(products.map((x) => x["brand"]));

    if (Object.keys(request.query).length !== 0) {
      let filterBrands = Object.keys(request.query);
      delete filterBrands["sortby"];
      products = filterAndSort(products, filterBrands, request.query["sortby"]);
    }

    response.render(`${v1ViewsPath}/product.html`, {
      ...v1BaseContext,
      loggedIn: request.session.loggedIn,
      layout: "./basev1.html",
      products: products,
      productsString: JSON.stringify(products),
      category: "Search",
      subcategory: "Results",
      subcategoryId: "search",
      query: query,
      brands: brands,
    });
  }
);

// V2 INFORMATION

app.get(`${v2UrlPath}`, async (request, response) => {
  let products = await database.getAllProducts();
  let featured = await database.getProductById(4);
  let brands = Array.from(new Set(products.map((x) => x["brand"])));
  products = filterAndSort(products, brands, "Best sellers");

  response.render(`${v2ViewsPath}/index.html`, {
    ...v2BaseContext,
    userFirstName: request.session.firstName,
    loggedIn: request.session.loggedIn,
    featured: featured,
    products: products,
    layout: "./basev2.html",
  });
});

app.get(`${v2UrlPath}/account`, async (request, response) => {
  let passwordMismatch = request.session.passwordMismatch;
  request.session.passwordMismatch = null;

  let updateSuccess = request.session.updateSuccess;
  request.session.updateSuccess = null;
  let user = await database.getUser({ id: request.session.userId });

  response.render(`${v2ViewsPath}/myaccountV2.html`, {
    ...v2BaseContext,
    layout: "./basev2.html",
    userFirstName: request.session.firstName,
    loggedIn: request.session.loggedIn,
    user: user,
    passwordMismatch: passwordMismatch,
    updateSuccess: updateSuccess,
  });
});

app.get(`${v2UrlPath}/cart`, (request, response) => {
  response.render(`${v2ViewsPath}/cartV2.html`, {
    ...v2BaseContext,
    userFirstName: request.session.firstName,
    loggedIn: request.session.loggedIn,
    layout: "./basev2.html",
  });
});

app.get(`${v2UrlPath}/checkoutV2`, async (request, response) => {
  let user = await database.getUser({ id: request.session.userId });
  response.render(`${v2ViewsPath}/checkoutV2.html`, {
    ...v2BaseContext,
    layout: "./basev2.html",
    user: user,
  });
});

app.get(`${v2UrlPath}/purchasesuccV2`, (request, response) => {
  response.render(`${v2ViewsPath}/purchasesuccV2.html`, {
    ...v2BaseContext,
    layout: "./authv2.html",
  });
});

app.get(`${v2UrlPath}/desktops`, async (request, response) => {
  let subcategoryId = "desktops";
  let products = await database.getProducts({ subcategory: subcategoryId });
  brands = new Set(products.map((x) => x["brand"]));

  if (Object.keys(request.query).length !== 0) {
    let filterBrands = Object.keys(request.query);
    delete filterBrands["sortby"];
    products = filterAndSort(products, filterBrands, request.query["sortby"]);
  }

  response.render(`${v2ViewsPath}/productpageV2.html`, {
    ...v2BaseContext,
    userFirstName: request.session.firstName,
    loggedIn: request.session.loggedIn,
    layout: "./basev2.html",
    products: products,
    productsString: JSON.stringify(products),
    category: "Computers",
    subcategory: "Desktops",
    subcategoryId: subcategoryId,
    brands: brands,
  });
});

app.get(`${v2UrlPath}/iphone`, async (request, response) => {
  let subcategoryId = "iphone";
  let products = await database.getProducts({ subcategory: subcategoryId });
  brands = new Set(products.map((x) => x["brand"]));

  if (Object.keys(request.query).length !== 0) {
    let filterBrands = Object.keys(request.query);
    delete filterBrands["sortby"];
    products = filterAndSort(products, filterBrands, request.query["sortby"]);
  }

  response.render(`${v2ViewsPath}/productpageV2.html`, {
    ...v2BaseContext,
    userFirstName: request.session.firstName,
    loggedIn: request.session.loggedIn,
    layout: "./basev2.html",
    products: products,
    productsString: JSON.stringify(products),
    category: "Phones",
    subcategory: "iPhone",
    subcategoryId: subcategoryId,
    brands: brands,
  });
});

app.get(`${v2UrlPath}/samsung`, async (request, response) => {
  let subcategoryId = "samsung";
  let products = await database.getProducts({ subcategory: subcategoryId });
  brands = new Set(products.map((x) => x["brand"]));

  if (Object.keys(request.query).length !== 0) {
    let filterBrands = Object.keys(request.query);
    delete filterBrands["sortby"];
    products = filterAndSort(products, filterBrands, request.query["sortby"]);
  }

  response.render(`${v2ViewsPath}/productpageV2.html`, {
    ...v2BaseContext,
    userFirstName: request.session.firstName,
    loggedIn: request.session.loggedIn,
    layout: "./basev2.html",
    products: products,
    productsString: JSON.stringify(products),
    category: "Samsung",
    subcategoryId: subcategoryId,
    brands: brands,
  });
});

app.get(`${v2UrlPath}/dslr`, async (request, response) => {
  let subcategoryId = "dslr";
  let products = await database.getProducts({ subcategory: subcategoryId });
  brands = new Set(products.map((x) => x["brand"]));

  if (Object.keys(request.query).length !== 0) {
    let filterBrands = Object.keys(request.query);
    delete filterBrands["sortby"];
    products = filterAndSort(products, filterBrands, request.query["sortby"]);
  }

  response.render(`${v2ViewsPath}/productpageV2.html`, {
    ...v2BaseContext,
    userFirstName: request.session.firstName,
    loggedIn: request.session.loggedIn,
    layout: "./basev2.html",
    products: products,
    productsString: JSON.stringify(products),
    category: "DSLR",
    subcategoryId: subcategoryId,
    brands: brands,
  });
});

app.get(`${v2UrlPath}/pointshoot`, async (request, response) => {
  let subcategoryId = "pointshoot";
  let products = await database.getProducts({ subcategory: subcategoryId });
  brands = new Set(products.map((x) => x["brand"]));

  if (Object.keys(request.query).length !== 0) {
    let filterBrands = Object.keys(request.query);
    delete filterBrands["sortby"];
    products = filterAndSort(products, filterBrands, request.query["sortby"]);
  }

  response.render(`${v2ViewsPath}/productpageV2.html`, {
    ...v2BaseContext,
    userFirstName: request.session.firstName,
    loggedIn: request.session.loggedIn,
    layout: "./basev2.html",
    products: products,
    productsString: JSON.stringify(products),
    category: "Point & Shoot",
    subcategoryId: subcategoryId,
    brands: brands,
  });
});

app.get(`${v2UrlPath}/movies`, async (request, response) => {
  let subcategoryId = "movies";
  let products = await database.getProducts({ subcategory: subcategoryId });
  brands = new Set(products.map((x) => x["brand"]));

  if (Object.keys(request.query).length !== 0) {
    let filterBrands = Object.keys(request.query);
    delete filterBrands["sortby"];
    products = filterAndSort(products, filterBrands, request.query["sortby"]);
  }

  response.render(`${v2ViewsPath}/productpageV2.html`, {
    ...v2BaseContext,
    userFirstName: request.session.firstName,
    loggedIn: request.session.loggedIn,
    layout: "./basev2.html",
    products: products,
    productsString: JSON.stringify(products),
    category: "Movies",
    subcategoryId: subcategoryId,
    brands: brands,
  });
});

app.get(`${v2UrlPath}/music`, async (request, response) => {
  let subcategoryId = "music";
  let products = await database.getProducts({ subcategory: subcategoryId });
  brands = new Set(products.map((x) => x["brand"]));

  if (Object.keys(request.query).length !== 0) {
    let filterBrands = Object.keys(request.query);
    delete filterBrands["sortby"];
    products = filterAndSort(products, filterBrands, request.query["sortby"]);
  }

  response.render(`${v2ViewsPath}/productpageV2.html`, {
    ...v2BaseContext,
    userFirstName: request.session.firstName,
    loggedIn: request.session.loggedIn,
    layout: "./basev2.html",
    products: products,
    productsString: JSON.stringify(products),
    category: "Music",
    subcategoryId: subcategoryId,
    brands: brands,
  });
});

app.get(`${v2UrlPath}/product`, (request, response) => {
  response.render(`${v2ViewsPath}/product.html`, { layout: false });
});

app.get(
  `${v2UrlPath}/tablets`,
  bodyParser.urlencoded(),
  async (request, response) => {
    let subcategoryId = "tablets";
    let products = await database.getProducts({ subcategory: subcategoryId });
    brands = new Set(products.map((x) => x["brand"]));

    if (Object.keys(request.query).length !== 0) {
      let filterBrands = Object.keys(request.query);
      delete filterBrands["sortby"];
      products = filterAndSort(products, filterBrands, request.query["sortby"]);
    }

    response.render(`${v2ViewsPath}/productpageV2.html`, {
      ...v2BaseContext,
      userFirstName: request.session.firstName,
      loggedIn: request.session.loggedIn,
      layout: "./basev2.html",
      products: products,
      productsString: JSON.stringify(products),
      category: "Tablets",
      subcategoryId: subcategoryId,
      brands: brands,
    });
  }
);

app.get(`${v2UrlPath}/productinfo`, async (request, response) => {
  let product = await database.getProductById(request.query["id"]);

  response.render(`${v2ViewsPath}/productdetailsV2.html`, {
    ...v2BaseContext,
    userFirstName: request.session.firstName,
    loggedIn: request.session.loggedIn,
    layout: "./basev2.html",
    prod: product,
    productsString: JSON.stringify(product),
  });
});

app.get(`${v2UrlPath}/laptops`, async (request, response) => {
  let subcategoryId = "laptops";
  let products = await database.getProducts({ subcategory: subcategoryId });
  brands = new Set(products.map((x) => x["brand"]));

  if (Object.keys(request.query).length !== 0) {
    let filterBrands = Object.keys(request.query);
    delete filterBrands["sortby"];
    products = filterAndSort(products, filterBrands, request.query["sortby"]);
  }

  response.render(`${v2ViewsPath}/productpageV2.html`, {
    ...v2BaseContext,
    userFirstName: request.session.firstName,
    loggedIn: request.session.loggedIn,
    layout: "./basev2.html",
    products: products,
    productsString: JSON.stringify(products),
    category: "Laptops",
    subcategoryId: subcategoryId,
    brands: brands,
  });
});

app.get(
  `${v2UrlPath}/search`,
  bodyParser.urlencoded(),
  async (request, response) => {
    let query = request.query["query"];
    delete request.query["query"];
    let products = await database.searchProducts(query);
    brands = new Set(products.map((x) => x["brand"]));

    if (Object.keys(request.query).length !== 0) {
      let filterBrands = Object.keys(request.query);
      delete filterBrands["sortby"];
      products = filterAndSort(products, filterBrands, request.query["sortby"]);
    }

    response.render(`${v2ViewsPath}/productpageV2.html`, {
      ...v2BaseContext,
      userFirstName: request.session.firstName,
      loggedIn: request.session.loggedIn,
      layout: "./basev2.html",
      products: products,
      productsString: JSON.stringify(products),
      category: "Search",
      subcategory: "Results",
      subcategoryId: "search",
      query: query,
      brands: brands,
    });
  }
);

app.get(`${v2UrlPath}/locations`, (request, response) => {
  response.render(`${v2ViewsPath}/locationsV2.html`, {
    ...v2BaseContext,
    layout: "./basev2.html",
    userFirstName: request.session.firstName,
  });
});

app.get(`${v2UrlPath}/signin`, (request, response) => {
  let signInFailed = request.session.signInFailed;
  request.session.signInFailed = null;
  response.render(`${v2ViewsPath}/signinV2.html`, {
    ...v2BaseContext,
    layout: "./authv2.html",
    signInFailed: signInFailed,
  });
});

app.get(`${v2UrlPath}/about`, (request, response) => {
  response.render(`${v2ViewsPath}/aboutusV2.html`, {
    ...v2BaseContext,
    layout: "./basev2.html",
    loggedIn: request.session.loggedIn,
    userFirstName: request.session.firstName,
  });
});

app.get(`${v2UrlPath}/faq`, (request, response) => {
  response.render(`${v2ViewsPath}/faqV2.html`, {
    ...v2BaseContext,
    layout: "./basev2.html",
    loggedIn: request.session.loggedIn,
    userFirstName: request.session.firstName,
  });
});

app.get(`${v2UrlPath}/faq/accounts`, (request, response) => {
  response.render(`${v2ViewsPath}/accountsfaqV2.html`, {
    ...v2BaseContext,
    layout: "./basev2.html",
    loggedIn: request.session.loggedIn,
    userFirstName: request.session.firstName,
  });
});

app.get(`${v2UrlPath}/faq/returns`, (request, response) => {
  response.render(`${v2ViewsPath}/returnfaqV2.html`, {
    ...v2BaseContext,
    layout: "./basev2.html",
    loggedIn: request.session.loggedIn,
    userFirstName: request.session.firstName,
  });
});

app.get(`${v2UrlPath}/faq/payments`, (request, response) => {
  response.render(`${v2ViewsPath}/paymentsfaqV2.html`, {
    ...v2BaseContext,
    layout: "./basev2.html",
    loggedIn: request.session.loggedIn,
    userFirstName: request.session.firstName,
  });
});

app.get(`${v2UrlPath}/faq/shipping`, (request, response) => {
  response.render(`${v2ViewsPath}/shippingfaqV2.html`, {
    ...v2BaseContext,
    layout: "./basev2.html",
    loggedIn: request.session.loggedIn,
    userFirstName: request.session.firstName,
  });
});

app.get(`${v2UrlPath}/terms`, (request, response) => {
  response.render(`${v2ViewsPath}/terms&conditionsV2.html`, {
    ...v2BaseContext,
    layout: "./basev2.html",
    loggedIn: request.session.loggedIn,
    userFirstName: request.session.firstName,
  });
});

app.get(`${v2UrlPath}/contact`, (request, response) => {
  response.render(`${v2ViewsPath}/contactusV2.html`, {
    ...v2BaseContext,
    layout: "./basev2.html",
    loggedIn: request.session.loggedIn,
    userFirstName: request.session.firstName,
  });
});

app.get(`${v2UrlPath}/signout`, (request, response) => {
  request.session.destroy((error) => {});
  response.render(`${v2ViewsPath}/signedoutV2.html`, {
    ...v2BaseContext,
    layout: "./authv2.html",
  });
});

app.get(`${v2UrlPath}/signup`, (request, response) => {
  let passwordMismatch = request.session.passwordMismatch;
  request.session.passwordMismatch = null;
  response.render(`${v2ViewsPath}/createaccountV2.html`, {
    ...v2BaseContext,
    layout: "./authv2.html",
    passwordMismatch: passwordMismatch,
  });
});

app.get(`${v2UrlPath}/signup/success`, (request, response) => {
  response.render(`${v2ViewsPath}/createaccountsuccessV2.html`, {
    ...v2BaseContext,
    layout: "./authv2.html",
  });
});

// COMMON

app.post(
  `${commonUrlPath}/auth`,
  bodyParser.urlencoded(),
  async (request, response) => {
    try {
      user = await database.getUser({
        email: request.body.emailaddress,
        password: request.body.userpassword,
      });
      response.locals.userId = user["id"];
      request.session.loggedIn = true;
      request.session.userId = user["id"];
      request.session.firstName = user["first_name"];
      if (request.body.version == 2) {
        response.redirect(`${v2UrlPath}/`);
      } else {
        response.redirect(`${v1UrlPath}/`);
      }
    } catch (error) {
      request.session.signInFailed = true;
      if (request.body.version == 2) {
        response.redirect(`${v2UrlPath}/signin`);
      } else {
        response.redirect(`${v1UrlPath}/signin`);
      }
    }
  }
);

app.post(
  `${commonUrlPath}/adduser`,
  bodyParser.urlencoded(),
  async (request, response) => {
    if (request.body.userpassword === request.body.reenterpassword) {
      await database.addUser(
        request.body.firstname,
        request.body.lastname,
        request.body.emailaddress,
        request.body.userpassword
      );

      if (request.body.version == 2) {
        response.redirect(`${v2UrlPath}/signup/success`);
      } else {
        response.redirect(`${v1UrlPath}/signup/success`);
      }
    } else {
      request.session.passwordMismatch = true;
      if (request.body.version == 2) {
        response.redirect(`${v2UrlPath}/signup`);
      } else {
        response.redirect(`${v1UrlPath}/signup`);
      }
    }
  }
);

app.post(
  `${commonUrlPath}/purchase`,
  bodyParser.urlencoded(),
  async (request, response) => {
    if (request.body.version == 1) {
      response.redirect(`${v1UrlPath}/purchasesucc`);
    } else {
      response.redirect(`${v2UrlPath}/purchasesucc`);
    }
  }
);

app.post(`${commonUrlPath}/edituser`, async (request, response) => {
  let password = null;
  if (request.body.newpassword !== "") {
    password = request.body.newpassword;

    if (password !== request.body.reenterpassword) {
      request.session.passwordMismatch = true;
      if (request.body.version == 2) {
        response.redirect(`${v2UrlPath}/account`);
        return;
      } else {
        response.redirect(`${v1UrlPath}/account`);
        return;
      }
    }
  }

  await database.editUser(
    request.body.id,
    request.body.firstname,
    request.body.lastname,
    request.body.email,
    request.body.address,
    request.body.city,
    request.body.state,
    request.body.country,
    request.body.zipcode,
    request.body.cardname,
    request.body.cardnumber,
    request.body.expirationdate,
    request.body.cvvcode,
    request.body.billingzipcode,
    password
  );
  request.session.updateSuccess = true;

  if (request.body.version == 1) {
    response.redirect(`${v1UrlPath}/account`);
  } else {
    response.redirect(`${v2UrlPath}/account`);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
