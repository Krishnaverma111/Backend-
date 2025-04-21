const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const route = require("./Route/Route");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cors());

const port = 5001;

mongoose.connect(process.env.mongourl)
  .then(() => {
    console.log(`MongoDB connected successfully`);
  })
  .catch((e) => {
    console.log(`MongoDB error: ${e}`);
  });

app.use("/", route);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
