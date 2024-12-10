import express from 'express';
import cors from 'cors'; // Import cors

import authRoutes from './routes/authRoutes.js';
import dataRoutes from './routes/dataRoutes.js';

const app = express();
const port = 5000;

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/data', dataRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
