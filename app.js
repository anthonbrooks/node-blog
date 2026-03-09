const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
require("dotenv").config();
const apiKey = process.env.APIKEY;

// express app
const app = express();

const dbURI = apiKey;
const connectDB = require("./lib/mongodb");

app.use(async (req, res, next) => {
  try {
    await connectDB(process.env.APIKEY);
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  }
});

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// render home
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// render about
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

module.exports = app;
