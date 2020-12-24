// Create express app
var express = require("express")
var db = require("./database.js")
var bodyParser = require("body-parser");
// Server port
var HTTP_PORT = 8000 
var app = express()
var formRouter = require('./routes/formRoutes')(db);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api',formRouter);
app.get('/', (req, res) => {
    res.send('SUCCESS!');
  });
app.listen(HTTP_PORT, () => {
    console.log(`Server running on port http://localhost:${HTTP_PORT}`)
});
