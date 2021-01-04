// Create express app
var express = require("express")
var db = require("./database.js")
var bodyParser = require("body-parser");
// Server port
var HTTP_PORT = 8000
var app = express()
var formRouter = require('./routes/formRoutes')(db);
var jobRouter = require('./routes/jobRoutes')(db);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', formRouter);
app.use('/api', jobRouter);
app.get('/', (req, res) => {
  res.send('SUCCESS!');
});
const server = app.listen(HTTP_PORT, () => {  
  console.log(`Server running on port http://localhost:${HTTP_PORT}`)
});
var socketio = require('./socket').init(server);
process.on('SIGINT', () => {
  server.close(() => { 
    db.close();
    console.log('DB connection closed.');
   });  
  process.exit(0);
});