const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//define path for express config
const publicDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

const app = express();
const port = process.env.PORT || 3000

//setup handle bar engine and location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

//setup dir to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    author: "thanh tung",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "please provide the address",
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
    if (error) {
      return res.send({
        error,
      });
    } else {
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        } else {
          return res.send({
            location: location,
            forecast: forecastData,
            address: req.query.address,
          });
        }
      });
    }
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help page",
    author: "tung nguyen",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about page",
    author: "tung nguyen",
  });
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "please provide search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    author: "tung nguyen",
    errorMessage: "help page not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    author: "tung nguyen",
    errorMessage: "page not found",
  });
});

app.listen(port, () => {
  console.log("server is up on port "+ port);
});
