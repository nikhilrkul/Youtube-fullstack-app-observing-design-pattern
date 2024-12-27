const express = require("express");
const Subscription = require("../models/Subscription");
const Observable = require("../observers/observable"); // To manage notifications
const router = express.Router();

// Subscribe to a channel
router.post("/", async (req, res) => {
  const { userId, channelId } = req.body;

  try {
    // Check if subscription already exists
    const existingSubscription = await Subscription.findOne({
      userId,
      channelId,
    });
    if (existingSubscription) {
      return res.status(400).send("Already subscribed to this channel");
    }

    // Create a new subscription
    const subscription = new Subscription({ userId, channelId });
    await subscription.save();

    res.status(201).send("Subscribed successfully");
  } catch (error) {
    console.error("Error subscribing:", error);
    res.status(500).send("Error subscribing to the channel");
  }
});

// Get all subscriptions for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const subscriptions = await Subscription.find({ userId }).populate(
      "channelId"
    );
    res.status(200).json(subscriptions);
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).send("Error fetching subscriptions");
  }
});

module.exports = router;
