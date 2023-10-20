const express = require("express");
const cors = require("cors");
const sequelize = require('./src/configs/sequelize');
const cookieParser = require("cookie-parser");
require('dotenv').config();
const sessions = require('express-session');

const oneDay = 1000 * 60 * 60 * 24;

const app = express();

const authRoute = require("./src/routes/auth");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false 
}));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("hello");
});

app.use("/auth", authRoute);



sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(PORT, () => {
        console.log(`Service started at port:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
});


