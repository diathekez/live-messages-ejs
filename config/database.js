// This script connects to MongoDB
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
// This line is necessary for Railway
exports.connectDB = connectDB;

// This script connects to MongoDB on serverless cloud services
// const express = require("express");
// const mongoose = require("mongoose");

// const app = express();
// const PORT = process.env.PORT || 3000;

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.DB_STRING);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

//Routes go here
// app.all("*", (req, res) => {
//   res.json({ "every thing": "is awesome" });
// });

//Connect to the database before listening
// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log("listening for requests");
//   });
// });
