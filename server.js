require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./router/productRouter");
const errorMiddleware = require("./Middleware/errorMiddleware");
const app = express();
const cors = require("cors");
const LoginRouter = require("./router/loginRouter");

app.use(express.json());
app.use(errorMiddleware);

const MongoURL = process.env.MONGO_URL;
const port = process.env.PORT;
const FRONTEND = process.env.FRONTEND;

var corsOptions = {
  origin: FRONTEND,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use("/api", productRoute);
app.use("/api/login", LoginRouter);

app.get("/error", async (req, res) => {
  throw new Error("Fake Error");
});

mongoose
  .connect(MongoURL)
  .then(() => {
    app.listen(port, () => {
      console.log("node api ");
    });
    console.log("Successfully connected to mongodb");
  })
  .catch((error) => {
    console.log(error);
  });
