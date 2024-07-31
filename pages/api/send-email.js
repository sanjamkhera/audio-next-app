import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Function to convert image to base64
function imageToBase64(filePath) {
  const img = fs.readFileSync(filePath);
  return Buffer.from(img).toString('base64');
}

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, audioBase64, files } = req.body;

    // Check if required fields are present
    if (!email || (!audioBase64 && (!files || files.length === 0))) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Replace with your actual Gmail credentials or use environment variables
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
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

    // Base URL for the images
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/';

    // Convert images to base64
    const logoBase64 = imageToBase64(path.join(process.cwd(), 'public', 'logo.svg'));
    const hr24Base64 = imageToBase64(path.join(process.cwd(), 'public', 'email24hr.svg'));
    const satisfiedBase64 = imageToBase64(path.join(process.cwd(), 'public', 'email216.svg'));

    // HTML content for the email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <img src="data:image/svg+xml;base64,${logoBase64}" alt="Logo" style="width: 150px; margin-bottom: 20px;">
          <h2>Thanks for your submission!</h2>
          <p>Your files have been received, and there’s a copy of everything attached to this email as well.</p>
          <p>We are actively reviewing your project and will circle back with an estimate + contract shortly.</p>
          <p>Best,<br>Sophie S.<br>Client Success Advisor<br>
          <a href="mailto:sophie@prototypefast.com" style="color: #0073e6;">sophie@prototypefast.com</a></p>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
            <div style="display: flex; justify-content: space-around;">
              <div style="text-align: center;">
                <img src="data:image/svg+xml;base64,${hr24Base64}" alt="24hr turnaround">
              </div>
              <div style="text-align: center;">
                <img src="data:image/svg+xml;base64,${satisfiedBase64}" alt="216+ Satisfied Clients">
              </div>
            </div>
            <div style="margin-top: 20px; text-align: center;">
              <a href="https://www.linkedin.com" style="display: inline-block; padding: 10px 20px; color: white; background-color: #0073e6; border-radius: 5px; text-decoration: none;">
                Spread the word +15% discount*
              </a>
              <p style="margin-top: 10px; font-size: 12px;">* Post a recommendation on LinkedIn, send us a screenshot, and receive 15% off your next project.</p>
            </div>
          </div>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: [email, process.env.EMAIL_USER],
      subject: 'Your Estimate Request',
      html: htmlContent,
      attachments: [
        ...attachments
      ]
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
