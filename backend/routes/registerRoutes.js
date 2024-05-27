import express from 'express';
import { createContact } from '../controllers/registerController.js';

const router = express.Router();

router.post('/register', createContact);

export default router; // Export the router directly