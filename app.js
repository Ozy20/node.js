const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/userModel");
const config = require("config");
const sendVerificationEmail = require("./tokenSender");

const app = express();

// Middleware to parse JSON body
app.use(express.json());

if (!config.get("jwtsec")) {
    console.log("JWT secret is not defined!");
    process.exit(0);
}

// User Registration Route
app.post("/register", async (req, res) => {
    try {
        // Check if user with the same email already exists
        let existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).send({ message: "User with this email already exists!" });
        }

        let hashedPass = await bcrypt.hash(req.body.password, 10);
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
            isAdmin: req.body.isAdmin,
            isVerified: false
        });

        await user.save(); // Save the user to the database

        // Send verification email (with the token containing the email)
        sendVerificationEmail(user.email);

        res.status(200).send({
            message: "User added. Please check your email to verify your account.",
            data: { name: user.name, email: user.email }
        });

    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal server error" });
    }
});

// Email Verification Route
app.get("/verify/:token", async (req, res) => {
    try {
        // Decode the token, which contains the email
        const decoded = jwt.verify(req.params.token, config.get("jwtsec"));

        const user = await User.findOne({ email: decoded.email });
        
        if (!user) return res.status(404).send({ message: "User not found." });
        if (user.isVerified) return res.status(400).send({ message: "User already verified." });

        // Mark the user as verified
        user.isVerified = true;
        await user.save();

        res.status(200).send({ message: "Email verified successfully! You can now log in." });

    } catch (err) {
        res.status(400).send({ error: "Invalid or expired token." });
    }
});

// Start the server
app.listen(3101, () => {
    console.log("Server running on port 3101");
});
