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
  let category = "laptops";
  let products = await database.getProducts({ category: category });

  brands = new Set(products.map((x) => x["brand"]));

  response.render(`${v1ViewsPath}/product.html`, {
    ...v1BaseContext,
    products: products,
    category: category,
    brands: brands,
  });
});

app.get(`${v1UrlPath}/desktops`, async (request, response) => {
  let category = "desktops";
  let products = await database.getProducts({ category: category });

  brands = new Set(products.map((x) => x["brand"]));

  response.render(`${v1ViewsPath}/product.html`, {
    ...v1BaseContext,
    products: products,
    category: category,
    brands: brands,
  });
});

app.get(`${v1UrlPath}/tablets`, async (request, response) => {
  let category = "tablets";
  let products = await database.getProducts({ category: category });

  brands = new Set(products.map((x) => x["brand"]));

  response.render(`${v1ViewsPath}/product.html`, {
    ...v1BaseContext,
    products: products,
    category: category,
    brands: brands,
  });
});

app.get(`${v1UrlPath}/dslr`, async (request, response) => {
  let category = "dslr";
  let products = await database.getProducts({ category: category });

  brands = new Set(products.map((x) => x["brand"]));

  response.render(`${v1ViewsPath}/product.html`, {
    ...v1BaseContext,
    products: products,
    category: category,
    brands: brands,
  });
});

app.get(`${v1UrlPath}/pointshoot`, async (request, response) => {
  let category = "pointshoot";
  let products = await database.getProducts({ category: category });

  brands = new Set(products.map((x) => x["brand"]));

  response.render(`${v1ViewsPath}/product.html`, {
    ...v1BaseContext,
    products: products,
    category: category,
    brands: brands,
  });
});

app.get(`${v1UrlPath}/iphone`, async (request, response) => {
  let category = "iphone";
  let products = await database.getProducts({ category: category });

  brands = new Set(products.map((x) => x["brand"]));

  response.render(`${v1ViewsPath}/product.html`, {
    ...v1BaseContext,
    products: products,
    category: category,
    brands: brands,
  });
});

app.get(`${v1UrlPath}/samsung`, async (request, response) => {
  let category = "samsung";
  let products = await database.getProducts({ category: category });

  brands = new Set(products.map((x) => x["brand"]));

  response.render(`${v1ViewsPath}/product.html`, {
    ...v1BaseContext,
    products: products,
    category: category,
    brands: brands,
  });
});

app.get(`${v1UrlPath}/movies`, async (request, response) => {
  let category = "movies";
  let products = await database.getProducts({ category: category });

  brands = new Set(products.map((x) => x["brand"]));

  response.render(`${v1ViewsPath}/product.html`, {
    ...v1BaseContext,
    products: products,
    category: category,
    brands: brands,
  });
});

app.get(`${v1UrlPath}/music`, async (request, response) => {
  let category = "music";
  let products = await database.getProducts({ category: category });

  brands = new Set(products.map((x) => x["brand"]));

  response.render(`${v1ViewsPath}/product.html`, {
    ...v1BaseContext,
    products: products,
    category: category,
    brands: brands,
  });
});

// V2 INFORMATION

app.get(`${v2UrlPath}`, (request, response) => {
    response.render(
        `${v2ViewsPath}/index.html`,
        {
            ...v2BaseContext,
            loggedIn: request.session.loggedIn,
            layout: './basev2.html',
        }
    );
});

app.get(`${v2UrlPath}/accessories`, async (request, response) => {
  let category = "Accessories";
  let products = await database.getProducts({ category: category });

  brands = new Set(products.map((x) => x["brand"]));
    response.render(
        `${v2ViewsPath}/productpageV2.html`,
        {
            ...v2BaseContext,
            loggedIn: request.session.loggedIn,
            layout: './basev2.html',
            products: products,
            category: category,
            brands: brands,
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
  let category = "Computers";
  let products = await database.getProducts({ category: category });

  brands = new Set(products.map((x) => x["brand"]));
    response.render(
        `${v2ViewsPath}/productpageV2.html`,
        {
            ...v2BaseContext,
            loggedIn: request.session.loggedIn,
            layout: './basev2.html',
            products: products,
            category: category,
            brands: brands,
        }
    );
});

app.get(`${v2UrlPath}/phones`, async (request, response) => {
  let category = "Phones";
  let products = await database.getProducts({ category: category });

  brands = new Set(products.map((x) => x["brand"]));
    response.render(
        `${v2ViewsPath}/productpageV2.html`,
        {
            ...v2BaseContext,
            loggedIn: request.session.loggedIn,
            layout: './basev2.html',
            products: products,
            category: category,
            brands: brands,
        }
    );
});

app.get(`${v2UrlPath}/product`, (request, response) => {
  response.render(`${v2ViewsPath}/product.html`, { layout: false });
});

app.get(`${v2UrlPath}/tablets`, async (request, response) => {
  let category = "Tablets";
  let products = await database.getProducts({ category: category });

  brands = new Set(products.map((x) => x["brand"]));
    response.render(
        `${v2ViewsPath}/productpageV2.html`,
        {
            ...v2BaseContext,
            loggedIn: request.session.loggedIn,
            layout: './basev2.html',
            products: products,
            category: category,
            brands: brands,
        }
    );
});

app.get(`${v2UrlPath}/laptops`, async (request, response) => {
  let category = "Laptops";
  let products = await database.getProducts({ category: category });

  brands = new Set(products.map((x) => x["brand"]));
    response.render(
        `${v2ViewsPath}/productpageV2.html`,
        {
            ...v2BaseContext,
            loggedIn: request.session.loggedIn,
            layout: './basev2.html',
            products: products,
            category: category,
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

app.get(`${v2UrlPath}/signup`, (request, response) => {
    response.render(
        `${v2ViewsPath}/createaccountV2.html`,
        {
            ...v2BaseContext,
            layout: false,
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


// COMMON

app.post(`${commonUrlPath}/auth`,
    bodyParser.urlencoded(),
    async (request, response) => {
        try {
            user = await database.getUser({email: request.body.emailaddress, password: request.body.userpassword});
            response.locals.userId = user['id'];
            request.session.loggedIn = true;
            request.session.userId = user['id'];
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


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
