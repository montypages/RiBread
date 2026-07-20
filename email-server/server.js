import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Middleware parsing
app.use(cors());
app.use(express.json());

// Nodemailer SMTP configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Endpoint handling incoming contact forms
app.post('/api/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.RECEIVER_EMAIL,
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Email error:', error);
            return res.status(500).json({ success: false, message: 'Failed to send email.' });
        }
        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server executing safely on port ${PORT}`));
