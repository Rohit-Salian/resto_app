const mongoose = require("mongoose");
const colors = require("colors");

//function mongo DB connection
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to Database ${mongoose.connection.host}`.bgCyan);
  } catch (error) {
    console.log(error, "Db Error".bgRed);
  }
};

module.exports = connectDb;
