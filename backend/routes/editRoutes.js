import express from 'express';
import { updateContact, getContactById } from '../controllers/contactControllers.js';


const router = express.Router();

router.get('/:id',getContactById);
router.put('/:id', updateContact);

export default router; 