import express from 'express';
import { deleteContact } from '../controllers/contactControllers.js';


const router = express.Router();



router.delete('/:id', deleteContact);


export default router; 