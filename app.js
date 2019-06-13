const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const routesController = require("./server/controllers/routesController");
const apiController = require("./server/controllers/apiController");

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.set("view engine", "ejs");
app.use(
  express.urlencoded({
    extended: false
  })
);

app.get("/", routesController.getHome);
app.post("/postaddresses", apiController.axiosPost);

app.listen(port, () => console.log(`I hear ya port: ${port}`));
