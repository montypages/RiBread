import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `RiBread.com new message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

${message}
`,
    });
    await transporter.sendMail({
    from: `"RiBread" <${process.env.RECEIVER_EMAIL}>`,
    to: email,
    subject: "Thanks for contacting RiBread!",
    text: `Thanks for contacting RiBread!`,
    html: `
        <h2>Thanks for contacting RiBread! 🍪</h2>

        <p>Hi ${name},</p>

        <p>Thanks for your message! I received it and will get back to you as soon as I can.</p>

        <h3>Your Message</h3>

        <blockquote style="border-left:4px solid #ccc;padding-left:12px;">
            ${message}
        </blockquote>

        <p>Have a sweet day!</p>

        <p><strong>— RiBread</strong></p>
    `
});
    return res.status(200).json({
      success: true,
      message: "Thanks! Your message has been sent.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Sorry, something went wrong. Please try again.",
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
