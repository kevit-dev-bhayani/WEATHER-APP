const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");
const { watch } = require("fs");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const viewDirectoryPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewDirectoryPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));
app.get("", (req, res) => {
  // res.send('Hello Express')
  res.render("index", {
    title: "Weather app",
    name: "Dev Bhayani",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "no address provided" });
  }
  async function main() {
    let address = await geocode(req.query.address);

    // , (err, { latitude, longitude, location } = {}) => {
    //   if (err) {
    //     res.send({ error: err });
    //   } else {
    //     forecast(latitude, longitude, (err, data) => {
    //       if (err) {
    //         res.send({ Error: err });
    //       } else {
    //         res.send({ forecast: data, location: location });
    //       }
    //     });
    //   }
    // });
    if (address.hasOwnProperty("error")) {
      res.send({ error: address.error });
    } else {
      let weather=await forecast(address.latitude,address.longitude,address.location)
      console.log(weather)
      res.send(weather)
      // res.send(address)
    }
  }
  main();
});

app.get("/about", (req, res) => {
  // res.send('<h1>about</h1>')
  // app.use(express.static(aboutPagePath))
  res.render("about", {
    title: "About Page",
    name: "Dev Bhayani",
  });
});

app.get("/help", (req, res) => {
  // res.send('help page')
  res.render("help", {
    title: "Help page",
    name: "Dev Bhayani",
    message: "do you need any help",
  });
});

app.get("*", (req, res) => {
  // res.send('help page')
  res.render("help", {
    title: "404 Error....",
    message: "An error occurred",
    name: "Dev Bhayani",
  });
});

app.listen(3000, () => {
  console.log("app is listing on port 3000");
});
