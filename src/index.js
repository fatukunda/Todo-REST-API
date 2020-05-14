const express = require("express");
const cors = require("cors");
require("./db/db");
const todosView = require("./views/todosView");
const userView = require("./views/userView");

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(todosView);
app.use(userView);

app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to our REST API." });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
