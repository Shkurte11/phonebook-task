import express from 'express';
import { updateContact} from '../controllers/contactControllers.js';
import {authenticateToken} from "../middleware/auth.js";


const router = express.Router();



router.put('/:id',authenticateToken, updateContact);



export default router; 