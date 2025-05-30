import express from 'express';
import { showAllContacts} from '../controllers/contactControllers.js';
import {authenticateToken} from "../middleware/auth.js";


const router = express.Router();


router.get('/contacts',authenticateToken, showAllContacts);


export default router; 