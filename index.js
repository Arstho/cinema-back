const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth.router");
const fileUpload = require("express-fileupload");

const app = express();
dotenv.config();

// Constants

const PORT = process.env.PORT || 3001;
const NAME = process.env.NAME;
const PASSWORD = process.env.PASSWORD;

// Middleware

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static("uploads"));

// Routes

app.use(require("./routes/auth.router"));

// app.use("/api/auth", authRoute);

async function start() {
  try {
    await mongoose.connect(`mongodb+srv://${NAME}:${PASSWORD}@cluster0.yzc6knt.mongodb.net/cinema`);
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}
start();
