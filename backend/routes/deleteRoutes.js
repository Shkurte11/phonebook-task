import express from 'express';
import { deleteContact } from '../controllers/contactControllers.js';
import {authenticateToken} from "../middleware/auth.js";


const router = express.Router();



router.delete('/:id', authenticateToken,deleteContact);


export default router; 