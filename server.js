var express = require("express");
var bodyParser = require("body-parser");
var cors = require('cors');

var PORT = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
// Serve static content for the app from the "public" directory in the application directory.

var router = require("./controller/GifRoute.js");


app.use(router);


app.use(cors());

app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});



