import express from "express";
import mongoose from "mongoose";
import requireAuth from "../middlewares/requireAuth.js";

const Track = mongoose.model("Track");

const trackRouter = express.Router();

trackRouter.use(requireAuth);

trackRouter.get("/tracks", async (req, res) => {
  console.log(req.body);

  const tracks = await Track.find({ userId: req.user._id });

  res.send(tracks);
});

trackRouter.post("/tracks", async (req, res) => {
  console.log(req.body);

  const { name, locations } = req.body;

  if (!name || !locations) {
    return res
      .status(422)
      .send({ error: "You must provide a name and locations." });
  }

  try {
    const track = new Track({ name, locations, userId: req.user._id });

    await track.save();

    res.send(track);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

export default trackRouter;
