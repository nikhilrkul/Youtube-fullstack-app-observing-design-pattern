const express = require("express");
const multer = require("multer");
const Video = require("../models/Video");
const Subscription = require("../models/Subscription");
const Observable = require("../observers/observable"); // To notify subscribers
const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" });

// Upload a new video
router.post("/upload", upload.single("video"), async (req, res) => {
  const { title, uploader } = req.body;

  try {
    // Save video details in the database
    const video = new Video({ title, uploader, filePath: req.file.path });
    await video.save();

    // Notify subscribers
    const subscriptions = await Subscription.find({
      channelId: uploader,
    }).populate("userId");
    subscriptions.forEach((sub) => {
      Observable.notify({ userId: sub.userId, video });
    });

    res
      .status(201)
      .send("Video uploaded successfully and subscribers notified!");
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).send("Error uploading video");
  }
});

// Get all videos
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find({}).populate("uploader", "username");
    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).send("Error fetching videos");
  }
});

// Get a single video by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const video = await Video.findById(id).populate("uploader", "username");
    if (!video) {
      return res.status(404).send("Video not found");
    }
    res.status(200).json(video);
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).send("Error fetching video");
  }
});

module.exports = router;

// mongodb+srv://NIKKI1234:<db_password>@cluster0.lj3ly.mongodb.net/
