//
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const toDoItems = require("./models/toDoItems");
const cors = require("cors")
const toDoController = require("./controllers/toDoItems")
const itemData = require('./utilities/itemData')


// Environmental variables
const app = express();
const mongoURI = process.env.MONGO_URI;
const port = process.env.port || 3001;
const db = mongoose.connection;

// Connectign to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("strictQuery", true);
mongoose.connection.once("open", () => {
  console.log("Mongo only pawn...in game of life.");
});

// Error / Disconnection
db.on('error', err => console.log(err.message + ' is Mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))

// Middleware
app.use(express.urlencoded({ extended: false }))// extended: false - does not allow nested objects in query strings
app.use(express.json()); //use .json(), not .urlencoded()
app.use(express.static('public')) // we need to tell express to use the public directory for static files... this way our app will find index.html as the route of the application! We can then attach React to that file!
app.use(cors())

// Routes
app.use("/toDoItems", toDoController) 
// telling server.js to get the routes from controller/todos.js

// Seeding the db
app.get('/seed', async (req, res) => {
    await toDoItems.deleteMany({});
    await toDoItems.insertMany(itemData);
    res.send('done!');
  });

app.listen(port, () => {
    console.log(port, "The Final Odyssey")
  })