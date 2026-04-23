import express from 'express';
import { createServer as createViteServer } from 'vite';
import { Resend } from 'resend';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import 'dotenv/config';

// Load Resend (from RESEND_API_KEY)
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_fallback');
const upload = multer({ storage: multer.memoryStorage() });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // --- API Routes ---

  // 1. Send Booking Email (and trigger WhatsApp redirect on client)
  app.post('/api/send-booking', async (req, res) => {
    try {
      const { clientName, email, phone, chefName, date, time, guests, location } = req.body;

      if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY is not set. Simulating email send for booking.');
      } else {
        await resend.emails.send({
          from: 'Booking <onboarding@resend.dev>', // Use a verified domain in production if you have one
          to: 'omaaaaagh@gmail.com',
          subject: 'New Booking - Tbakh.ma',
          html: `
            <h2>New Booking - Tbakh.ma</h2>
            <ul>
              <li><strong>Client Name:</strong> ${clientName}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Phone:</strong> ${phone}</li>
              <li><strong>Chef Name:</strong> ${chefName}</li>
              <li><strong>Date:</strong> ${date}</li>
              <li><strong>Time:</strong> ${time}</li>
              <li><strong>Number of People:</strong> ${guests}</li>
              <li><strong>Location:</strong> ${location}</li>
            </ul>
          `
        });
      }

      res.status(200).json({ success: true, message: 'Booking email sent successfully' });
    } catch (error) {
      console.error('Error sending booking email:', error);
      res.status(500).json({ success: false, error: 'Failed to send booking email' });
    }
  });

  // 2. Sent Chef Registration Email
  app.post('/api/send-chef-registration', upload.single('idCard'), async (req, res) => {
    try {
      const { name, email, phone, city, specialties } = req.body;
      const file = req.file;

      if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY is not set. Simulating email send for chef registration.');
      } else {
        const attachments = file ? [{
          filename: file.originalname,
          content: file.buffer,
        }] : [];

        await resend.emails.send({
          from: 'Registration <onboarding@resend.dev>',
          to: 'omaaaaagh@gmail.com',
          subject: 'New Chef Registration - Tbakh.ma',
          html: `
            <h2>New Chef Registration - Tbakh.ma</h2>
            <ul>
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Phone:</strong> ${phone}</li>
              <li><strong>City:</strong> ${city}</li>
              <li><strong>Specialty:</strong> ${specialties}</li>
            </ul>
          `,
          attachments
        });
      }

      res.status(200).json({ success: true, message: 'Chef registration email sent successfully' });
    } catch (error) {
      console.error('Error sending chef registration email:', error);
      res.status(500).json({ success: false, error: 'Failed to send chef registration email' });
    }
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
