const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();
let uri = "mongodb+srv://Cluster65972:Yush2003@cluster65972.rupf6v6.mongodb.net/";
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(uri, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const userSchema = new mongoose.Schema({
  name: String,
  phoneNumber: Number,
  email: String,
  member:String,
  date: Date
});

// const userSchema = new mongoose.Schema({
//   user_name: String,
//   Password: Number
// });

const User = mongoose.model("Restaurent", userSchema); // Changed model name to "User"

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/book", (req, res) => {
  res.render("book");
});
app.get("/billing", (req, res) => {
  res.render("billing");
});
app.get("/menu", (req, res) => {
  res.render("menu");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/index", (req, res) => {
  res.render("index");
});

app.post("/booktable", (req, res) => { // Corrected the order of parameters to (req, res)
  const newUser = new User({
    name: req.body.name,
    phoneNumber:req.body.phoneNumber,
    email: req.body.email,
    date: req.body.date,
    member:req.body.member
  });

  console.log(newUser);

  newUser
    .save()
    .then(() => {
      res.render("slip");
      console.log("You are registered successfully");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

app.listen(3000, function () {
  console.log("Server listening on port 3000");
});
