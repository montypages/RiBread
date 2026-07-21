require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `New Contact Form from ${name}`,
            text: `
Name: ${name}

Email: ${email}

Message:
${message}
`
        });

        res.send("Message sent successfully!");
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong.");
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});