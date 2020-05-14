const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Create an account/ Register user
router.post("/users", async (req, res) => {
  const userData = req.body;
  try {
    const user = new User(userData);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res
        .status(404)
        .send({ error: true, message: "Unable to login. Check credentials" });
    }
    res.status(200).send({ message: "Logged in successfully!", user });
  } catch (error) {
      console.log(error)
    res.status(400).send(error);
  }
});

module.exports = router;
