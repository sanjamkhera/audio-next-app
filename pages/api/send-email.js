import nodemailer from 'nodemailer';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, audioBase64, files } = req.body;

    // Check if required fields are present
    if (!email || (!audioBase64 && (!files || files.length === 0))) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Replace with your actual Gmail credentials or use environment variables
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Ensure correct casing: 'Gmail', not 'Gmail' or 'gmail'
      auth: {
        user: 'sanjam.khera@gmail.com',
        pass: 'npvn yfjk jupe jcde'
      }
    });

    const attachments = [];

    // Add audio attachment if present
    if (audioBase64) {
      attachments.push({
        filename: 'recording.mp3',
        content: audioBase64,
        encoding: 'base64'
      });
    }

    // Add file attachments if present
    if (files && files.length > 0) {
      files.forEach(file => {
        attachments.push({
          filename: file.name,
          content: file.content,
          encoding: 'base64'
        });
      });
    }

    const mailOptions = {
      from: 'sanjam.khera@gmail.com',
      to: email,
      subject: 'Your Estimate Request',
      text: 'Please find attached your audio recording and files.',
      attachments: attachments
    };

    try {
      // Send email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
