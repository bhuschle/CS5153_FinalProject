const database = require("./js/database.js");
const path = require("path");
const express = require("express");
const app = express();
const port = 8080;


app.use("/static/img", express.static("img"));
app.use("/static/js", express.static("js"));


app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "indexv2.html"));
});

app.get("/accessories", (request, response) => {
    response.sendFile(path.join(__dirname, "pages", "Accessories.html"));
});

app.get("/account", (request, response) => {
    response.sendFile(path.join(__dirname, "pages", "Account.html"));
});

app.get("/cart", (request, response) => {
    response.sendFile(path.join(__dirname, "pages", "cart.html"));
});

app.get("/computers", (request, response) => {
    response.sendFile(path.join(__dirname, "pages", "Computers.html"));
});

app.get("/phones", (request, response) => {
    response.sendFile(path.join(__dirname, "pages", "Phones.html"));
});

app.get("/product", (request, response) => {
    response.sendFile(path.join(__dirname, "pages", "product.html"));
});

app.get("/tablets", (request, response) => {
    response.sendFile(path.join(__dirname, "pages", "Tablets.html"));
});



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
