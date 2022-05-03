const database = require("./js/database.js");
const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const handlebars = require("express-handlebars");
const session = require("express-session");
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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: "Well-kept secret",
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false},
}));

const commonUrlPath = "/common";
const v1UrlPath = "";
const v2UrlPath = "/v2";

const v1ViewsPath = "./pages";
const v2ViewsPath = "./v2";

const commonBaseContext = {
    commonUrlRoot: commonUrlPath,
    imageRoot: imagePath,
}

const v1BaseContext = {
  ...commonBaseContext,
  layout: "./basev1.html",
  urlRoot: v1UrlPath,
};

const v2BaseContext = {
    ...commonBaseContext,
    urlRoot: v2UrlPath,
};


function filterAndSort(products, brands, sortBy) {
    products = products.filter(element => brands.includes(element['brand']))
    if (sortBy === "Low-to-high") {
        products.sort((a, b) => a['price'] - b['price']);
    }
    else if (sortBy === "High-to-low") {
        products.sort((a, b) => b['price'] - a['price']);
    }
    else if (sortBy === "Best sellers") {
        products.sort((a, b) => b['sold_count'] - a['sold_count']);
    }
    return products;
}


// V1 INFORMATION

app.get(`${v1UrlPath}/`, (request, response) => {
  response.render(`${v1ViewsPath}/index.html`, {
    ...v1BaseContext,
    userFirstName: request.session.firstName,
    loggedIn: request.session.loggedIn,
    layout: "./basev1.html",
  });
});

app.get(`${v1UrlPath}/account`, async (request, response) => {
  let user = await database.getUser({id: request.session.userId});

  response.render(`${v1ViewsPath}/account.html`, {
    ...v1BaseContext,
    userFirstName: request.session.firstName,
    loggedIn: request.session.loggedIn,
    layout: "./basev1.html",
    user: user,
  });
});

app.get(`${v1UrlPath}/cart`, (request, response) => {
  response.render(`${v1ViewsPath}/cart.html`, {
    ...v1BaseContext,
    loggedIn: request.session.loggedIn,
    layout: "./basev1.html",
  });
});

app.get(`${v1UrlPath}/laptops`, async (request, response) => {
  let products = await database.getProducts({ subcategory: "laptops" });

  brands = new Set(products.map((x) => x["brand"]));

  response.render(`${v1ViewsPath}/product.html`, {
    ...v1BaseContext,
    loggedIn: request.session.loggedIn,
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
    loggedIn: request.session.loggedIn,
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
    loggedIn: request.session.loggedIn,
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
    loggedIn: request.session.loggedIn,
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
    loggedIn: request.session.loggedIn,
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
    loggedIn: request.session.loggedIn,
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
    loggedIn: request.session.loggedIn,
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
    loggedIn: request.session.loggedIn,
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
    loggedIn: request.session.loggedIn,
    products: products,
    category: "Music",
    brands: brands,
  });
});

app.get(`${v1UrlPath}/signout`, (request, response) => {
  request.session.destroy((error)=>{});
  response.redirect(`${v1UrlPath}/`)
  /*response.render(
    `${v1ViewsPath}/signedout.html`,
    {
      ...v1BaseContext,
      layout: "./authv1.html",
    }
  );*/
});


// V2 INFORMATION

app.get(`${v2UrlPath}`, (request, response) => {
    response.render(
        `${v2ViewsPath}/index.html`,
        {
            ...v2BaseContext,
            userFirstName: request.session.firstName,
            loggedIn: request.session.loggedIn,
            layout: './basev2.html',
        }
    );
});

app.get(`${v2UrlPath}/account`, (request, response) => {
  response.render(`${v2ViewsPath}/account.html`, { layout: false });
});

app.get(`${v2UrlPath}/cart`, (request, response) => {
  response.render(`${v2ViewsPath}/cartV2.html`, { layout: false });
});

app.get(`${v2UrlPath}/computers`, async (request, response) => {
    let subcategoryId = "computers";
    let products = await database.getProducts({ subcategory: subcategoryId });
    brands = new Set(products.map((x) => x["brand"]));

    if (Object.keys(request.query).length !== 0) {
        let filterBrands = Object.keys(request.query);
        delete filterBrands['sortby'];
        products = filterAndSort(products, filterBrands, request.query['sortby']);
    }

    response.render(
        `${v2ViewsPath}/productpageV2.html`,
        {
            ...v2BaseContext,
            userFirstName: request.session.firstName,
            loggedIn: request.session.loggedIn,
            layout: './basev2.html',
            products: products,
            productsString: JSON.stringify(products),
            category: "Computers",
            subcategoryId: subcategoryId,
            brands: brands,
        }
    );
});

app.get(`${v2UrlPath}/iphone`, async (request, response) => {
    let subcategoryId = "computers";
    let products = await database.getProducts({ subcategory: subcategoryId });
    brands = new Set(products.map((x) => x["brand"]));

    if (Object.keys(request.query).length !== 0) {
        let filterBrands = Object.keys(request.query);
        delete filterBrands['sortby'];
        products = filterAndSort(products, filterBrands, request.query['sortby']);
    }
    
    response.render(
        `${v2ViewsPath}/productpageV2.html`,
        {
            ...v2BaseContext,
            userFirstName: request.session.firstName,
            loggedIn: request.session.loggedIn,
            layout: './basev2.html',
            products: products,
            productsString: JSON.stringify(products),
            category: "iPhone",
            subcategoryId, subcategoryId,
            brands: brands,
        }
    );
});

app.get(`${v2UrlPath}/samsung`, async (request, response) => {
    let subcategoryId = "samsung";
    let products = await database.getProducts({ subcategory: subcategoryId });
    brands = new Set(products.map((x) => x["brand"]));

    if (Object.keys(request.query).length !== 0) {
        let filterBrands = Object.keys(request.query);
        delete filterBrands['sortby'];
        products = filterAndSort(products, filterBrands, request.query['sortby']);
    }

    response.render(
        `${v2ViewsPath}/productpageV2.html`,
        {
            ...v2BaseContext,
            userFirstName: request.session.firstName,
            loggedIn: request.session.loggedIn,
            layout: './basev2.html',
            products: products,
            productsString: JSON.stringify(products),
            category: "Samsung",
            subcategoryId: subcategoryId,
            brands: brands,
        }
    );
});

app.get(`${v2UrlPath}/product`, (request, response) => {
  response.render(`${v2ViewsPath}/product.html`, { layout: false });
});

app.get(`${v2UrlPath}/tablets`,
    bodyParser.urlencoded(),
    async (request, response) => {
        let subcategoryId = "tablets";
        let products = await database.getProducts({ subcategory: subcategoryId });
        brands = new Set(products.map((x) => x["brand"]));

        if (Object.keys(request.query).length !== 0) {
            let filterBrands = Object.keys(request.query);
            delete filterBrands['sortby'];
            products = filterAndSort(products, filterBrands, request.query['sortby']);
        }

        response.render(
            `${v2ViewsPath}/productpageV2.html`,
            {
                ...v2BaseContext,
                loggedIn: request.session.loggedIn,
                layout: './basev2.html',
                products: products,
                category: "Tablets",
                subcategoryId: subcategoryId,
                brands: brands,
            }
        );
    }
);

app.get(`${v2UrlPath}/laptops`, async (request, response) => {
    let subcategoryId = "laptops";
    let products = await database.getProducts({ subcategory: subcategoryId });
    brands = new Set(products.map((x) => x["brand"]));
    
    if (Object.keys(request.query).length !== 0) {
        let filterBrands = Object.keys(request.query);
        delete filterBrands['sortby'];
        products = filterAndSort(products, filterBrands, request.query['sortby']);
    }

    response.render(
        `${v2ViewsPath}/productpageV2.html`,
        {
            ...v2BaseContext,
            userFirstName: request.session.firstName,
            loggedIn: request.session.loggedIn,
            layout: './basev2.html',
            products: products,
            productsString: JSON.stringify(products),
            category: "Laptops",
            subcategoryId: subcategoryId,
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

app.get(`${v2UrlPath}/signin`, (request, response) => {
    let signInFailed = request.session.signInFailed;
    request.session.signInFailed = null;
    response.render(
        `${v2ViewsPath}/signinV2.html`,
        {
            ...v2BaseContext,
            layout: "./authv2.html",
            signInFailed: signInFailed,
        }
    )
})

app.get(`${v2UrlPath}/about`, (request, response) => {
    response.render(
        `${v2ViewsPath}/aboutusV2.html`,
        {
            ...v2BaseContext,
            layout: false,
        }
    )
})

app.get(`${v2UrlPath}/signout`, (request, response) => {
    request.session.destroy((error)=>{});
    response.render(
        `${v2ViewsPath}/signedoutV2.html`,
        {
            ...v2BaseContext,
            layout: "./authv2.html",
        }
    );
});

app.get(`${v2UrlPath}/signup`, (request, response) => {
    let passwordMismatch = request.session.passwordMismatch;
    request.session.passwordMismatch = null;
    response.render(
        `${v2ViewsPath}/createaccountV2.html`,
        {
          ...v2BaseContext,
          layout: "./authv2.html",
          passwordMismatch: passwordMismatch,
        }
    );
});

app.get(`${v2UrlPath}/signup/success`, (request, response) => {
  response.render(
      `${v2ViewsPath}/createaccountsuccessV2.html`,
      {
        ...v2BaseContext,
        layout: "./authv2.html",
      }
  );
});


// COMMON

app.post(`${commonUrlPath}/auth`,
    bodyParser.urlencoded(),
    async (request, response) => {
        try {
            user = await database.getUser({email: request.body.emailaddress, password: request.body.userpassword});
            response.locals.userId = user['id'];
            request.session.loggedIn = true;
            request.session.userId = user['id'];
            request.session.firstName = user['first_name'];
            if (request.body.version == 2){
              response.redirect(v2UrlPath);
            }
            else {
              response.redirect(v1UrlPath);
            }
        }
        catch (error) {
          request.session.signInFailed = true;
          if (request.body.version == 2){
            response.redirect(`${v2UrlPath}/signin`);
          }
          else {
            response.redirect(`${v1UrlPath}/signin`);
          }
        }
    }
);

app.post(`${commonUrlPath}/adduser`,
    bodyParser.urlencoded(),
    async (request, response) => {
    if (request.body.userpassword === request.body.reenterpassword) {
        await database.addUser(
            request.body.firstname,
            request.body.lastname,
            request.body.emailaddress,
            request.body.userpassword,
            request.body.address,
            request.body.city,
            request.body.state,
            request.body.country,
            request.body.zipcode
        );

        if (request.body.version == 2){
          response.redirect(`${v2UrlPath}/signup/success`);
        }
        else {
          response.redirect(`${v1UrlPath}/signup/success`);
        }
    }
    else {
        request.session.passwordMismatch = true;
        if (request.body.version == 2){
            response.redirect(`${v2UrlPath}/signup`);
        }
        else {
            response.redirect(`${v1UrlPath}/signup`);
        }
    }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
