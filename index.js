const express = require("express");
const mongoose = require("mongoose");
const Users = require("./models/userDetails");
const cors = require("cors");
const dotenv = require("dotenv").config();
const port = process.env.PORT;

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.mongo)
  .then(() => console.log("DB connection established"))
  .catch((err) => console.log(err.message));

app.get("/data", async (req, res) => {
  const allData = await Users.find();
  res.send(allData);
});

app.use("/api/details", require("./routes/detailsRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}`));
