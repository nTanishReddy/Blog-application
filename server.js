const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//env config
dotenv.config();

//router imports
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

//mongoDB connection
connectDB();

//REST object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

const port = process.env.PORT || 5000;
const dev_mode = process.env.DEV_MODE || "development";
//Listen
app.listen(port, () => {
  console.log(`Server running on ${dev_mode} port no. ${port}`.bgCyan.white);
});
