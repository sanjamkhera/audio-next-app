// import nodemailer from 'nodemailer';

// const handler = async (req, res) => {
//   if (req.method === 'POST') {
//     const { email, audioBase64, files } = req.body;

//     // Check if required fields are present
//     if (!email || (!audioBase64 && (!files || files.length === 0))) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     // Replace with your actual Gmail credentials or use environment variables
//     const transporter = nodemailer.createTransport({
//       service: 'Gmail', // Ensure correct casing: 'Gmail', not 'Gmail' or 'gmail'
//       auth: {
//         user: 'sanjam.khera@gmail.com',
//         pass: 'npvn yfjk jupe jcde'
//       }
//     });

//     const attachments = [];

//     // Add audio attachment if present
//     if (audioBase64) {
//       attachments.push({
//         filename: 'recording.mp3',
//         content: audioBase64,
//         encoding: 'base64'
//       });
//     }

//     // Add file attachments if present
//     if (files && files.length > 0) {
//       files.forEach(file => {
//         attachments.push({
//           filename: file.name,
//           content: file.content,
//           encoding: 'base64'
//         });
//       });
//     }

//     const mailOptions = {
//       from: 'sanjam.khera@gmail.com',
//       to: email,
//       subject: 'Your Estimate Request',
//       text: 'Please find attached your audio recording and files.',
//       attachments: attachments
//     };

//     try {
//       // Send email
//       await transporter.sendMail(mailOptions);
//       res.status(200).json({ message: 'Email sent successfully' });
//     } catch (error) {
//       console.error('Error sending email:', error);
//       res.status(500).json({ message: 'Error sending email' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// };

// export default handler;


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
      service: 'Gmail',
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

    // Base URL for the images
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host;
    const baseUrl = `${protocol}://${host}/`;

    // HTML content for the email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <img src="${baseUrl}logo.svg" alt="Logo" style="width: 150px; margin-bottom: 20px;">
          <h2>Thanks for your submission!</h2>
          <p>Your files have been received, and there’s a copy of everything attached to this email as well.</p>
          <p>We are actively reviewing your project and will circle back with an estimate + contract shortly.</p>
          <p>Best,<br>Sophie S.<br>Client Success Advisor<br>
          <a href="mailto:sophie@prototypefast.com" style="color: #0073e6;">sophie@prototypefast.com</a></p>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
            <div style="display: flex; justify-content: space-between;">
              <div style="text-align: center;">
                <img src="${baseUrl}24hr.svg" alt="24hr turnaround" style="width: 50px;">
                <p style="margin: 5px 0;">24hr turnaround</p>
                <p style="margin: 5px 0; font-size: 12px;">100% confidential</p>
              </div>
              <div style="text-align: center;">
                <img src="${baseUrl}achieve.svg" alt="216+ Satisfied Clients" style="width: 50px;">
                <p style="margin: 5px 0;">216+ Satisfied</p>
                <p style="margin: 5px 0; font-size: 12px;">C-Suite Clients</p>
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
      from: 'sanjam.khera@gmail.com',
      to: [email, 'sanjam.khera@gmail.com'], // Send to both user and yourself
      subject: 'Your Estimate Request',
      html: htmlContent,
      attachments: [
        ...attachments // Include the audio and file attachments
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

