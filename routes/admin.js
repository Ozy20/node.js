const express = require("express");
const router = express.Router();
const User = require("../models/usersModel")
const authRole = require("../middelwares/AuthPerMW")

//update
router.put("/:id", authRole, async (req, res) => {
    try {
        // Attempt to update the user by ID
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            { isAdmin: true },
            { new: true } // Return the updated document
        );

        // Check if the user exists
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Send a success message
        res.status(200).send("Admin added successfully");
    } catch (err) {
        // Log the error for debugging and send a 400 response
        console.error(err);
        res.status(400).send("Could not add the admin");
    }
});

module.exports = router;
