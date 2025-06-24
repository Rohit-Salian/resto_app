const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

// dot env config
dotenv.config();

//db connection
connectDb();

// rest object
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/resturant", require("./routes/restauranRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));

// create route/ port
// http://localhost:8080
app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to food server </h1>");
});

// port
// const PORT = 8080;
const PORT = process.env.PORT;

//listen
app.listen(PORT, () => console.log(`Server Running on ${PORT}`.bgWhite));
