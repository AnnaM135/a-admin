const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models/models");
const corsOptions = {
  origin: "http://localhost:3000",
};
const fileupload = require('express-fileupload')
// const { sequelize } = require('./sequelize/model');
// sequelize.authenticate().then(res=>console.log(res)).catch(err=>console.log(err))
const morgan = require('morgan')
const AuthRouter = require("./router/AuthRouter")
const ServicesRouter = require("./router/ServicesRouter")
const GalleryRouter = require("./router/GalleryRouter")

app.use(express.static(__dirname + "/public/"));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors());


// app.get("/", (req, res) => {
//   res.send("ok");
// });

db.connect.authenticate()
.then(() => console.log("db connected"))
.catch((err) => console.log(err))

db.connect.sync()
app.use(morgan('dev'))
app.use(fileupload())
app.use("/login", AuthRouter)
app.use("/services", ServicesRouter)
app.use("/gallery", GalleryRouter)

app.listen(8000, console.log("server listen on http://localhost:8000"));