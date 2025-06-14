import express from 'express';
import registerRoutes from './routes/registerRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import editRoutes from './routes/editRoutes.js';
import updateRoutes from './routes/updateRoutes.js';
import deleteRoutes from './routes/deleteRoutes.js';
import authRoutes from './routes/authRoutes.js';


import cors from 'cors'

const app = express();


app.use(express.json());
app.use(cors())


// Mount the register routes
app.use('/api/contactRoutes', contactRoutes);
app.use('/api/editRoutes', editRoutes);
app.use('/api/updateRoutes', updateRoutes);
app.use('/api/deleteRoutes', deleteRoutes);
app.use('/api/contact/', registerRoutes);

app.use('/api/auth', authRoutes);


// Start the server
  const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
