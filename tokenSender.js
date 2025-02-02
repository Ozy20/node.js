const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const config = require("config");
const secureConfig = require('./scure_config/EmailConfig');

// Create a transport object for email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: secureConfig.EMAIL_USERNAME,
        pass: secureConfig.EMAIL_PASSWORD
    }
});

// Function to Send Verification Email
const sendVerificationEmail = (email) => {
    // Generate token with the email directly (no need for user ID)
    const token = jwt.sign({ email: email }, config.get("jwtsec"), { expiresIn: '10m' });

    const mailConfigurations = {
        from: secureConfig.EMAIL_USERNAME,
        to: email,
        subject: 'Email Verification',
        text: `Hi! Please verify your email by clicking the link below:
               http://localhost:3101/verify/${token} 
               This link will expire in 10 minutes.`
    };

    transporter.sendMail(mailConfigurations, function(error, info) {
        if (error) {
            console.log("Error sending email:", error);
        } else {
            console.log("Email Sent Successfully:", info.response);
        }
    });
};

module.exports = sendVerificationEmail;
