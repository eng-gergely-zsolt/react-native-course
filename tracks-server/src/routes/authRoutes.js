import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const User = mongoose.model("User");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await new User({ email, password });

    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");

    await user.save();

    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

authRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password." });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(422).send({ error: "Invalid password or email." });
  }

  try {
    await user.comparePassword(password);

    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");

    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: "Invalid password or email." });
  }
});

export default authRouter;
