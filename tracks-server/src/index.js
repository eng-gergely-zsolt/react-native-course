import "./models/User.js";
import "./models/Track.js";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import authRouter from "./routes/authRoutes.js";
import trackRouter from "./routes/trackRoutes.js";
import requireAuth from "./middlewares/requireAuth.js";

const app = express();

const mongoUri =
  "mongodb+srv://admin:admin@reactnative.gh08h.mongodb.net/?retryWrites=true&w=majority&appName=ReactNative";

app.use(bodyParser.json());

app.use(authRouter);

app.use(trackRouter);

mongoose.connect(mongoUri);

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
