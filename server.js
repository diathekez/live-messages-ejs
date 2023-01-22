const express = require("express");
const app = express();

// Serverless connection
const { MongoClient } = require("mongodb");
const uri = process.env.DB_STRING;
const client = new MongoClient(uri);
//

const connectDB = require("./config/database");
const homeRoutes = require("./routes/home");
const todoRoutes = require("./routes/todos");

//Use .env variables
require("dotenv").config({ path: "./config/.env" });

connectDB();

//EJS
app.set("view engine", "ejs");

//Static folder
app.use(express.static("public"));

//Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", homeRoutes);
app.use("/todos", todoRoutes);

// Heroku configuration
// app.listen(process.env.PORT, () => {
//   console.log("Server is running, homie.");
// });

// Cyclic configuration
const dbS = connectDB().then(() => {
  client.connect(async (err) => {
    //Connect To Database
    // connectDB();
    // if(!connect) {console.log('Mongoose ran away'); return false}
    if (err) {
      console.error(err);
      return false;
    }
    // connection to mongo is successful, listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Listening for requests");
    });
  });
  // connectDB(app)
  //
});
