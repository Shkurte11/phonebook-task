import express from 'express';
import { updateContact, getContactById } from '../controllers/contactControllers.js';
import {authenticateToken} from "../middleware/auth.js";


const router = express.Router();

router.get('/:id',authenticateToken,getContactById);
router.put('/:id',authenticateToken, updateContact);

export default router; 