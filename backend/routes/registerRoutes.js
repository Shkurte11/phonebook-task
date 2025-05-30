import express from 'express';
import { createContact } from '../controllers/registerController.js';
import {authenticateToken} from "../middleware/auth.js";

const router = express.Router();

router.post('/register',authenticateToken, createContact);

export default router; // Export the router directly