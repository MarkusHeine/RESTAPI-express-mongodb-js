const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

const getSubscriber = async (req, res, next) => {
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if (subscriber === null) {
            return res.status(404).json({ message: "Cannot find subscriber" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.subscriber = subscriber;
    next();
};

// Find all Users

router.get("/", async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.status(200).json(subscribers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Add new Subscriber

router.post("/", async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    });
    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

// Find one Subscriber by Id

router.get("/:id", getSubscriber, (req, res) => {
    res.status(200).send(res.subscriber);
});

// Update subscriber

router.patch("/:id", getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name;
    }
    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
    }
    try {
        const ubdatedSubscriber = await res.subscriber.save();
        res.status(200).json(ubdatedSubscriber);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

// Delete subscriber

router.delete("/:id", getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove();
        res.status(200).json({ message: "Deleted subscriber" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
