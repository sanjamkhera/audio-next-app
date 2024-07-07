// pages/api/send-email.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, audioUrl, files } = req.body;

    // Configure the SMTP transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your email service provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Recorded Audio and Attachments',
      text: 'Please find the recorded audio and attachments below.',
      attachments: [
        {
          filename: 'recording.wav',
          path: audioUrl, // Use a publicly accessible URL for the audio file
        },
        ...files.map((file, index) => ({
          filename: file.name,
          content: file.content,
          encoding: 'base64',
        })),
      ],
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send email', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
