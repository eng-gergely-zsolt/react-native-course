import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const User = mongoose.model("User");

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  // authorization = "Bearer <authorization-token>"

  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in." });
  }

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, "MY_SECRET_KEY", async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "You must be logged in." });
    }

    const { userId } = payload;

    const user = await User.findById(userId);

    req.user = user;

    next();
  });
};

export default requireAuth;
