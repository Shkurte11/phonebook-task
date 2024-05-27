import express from 'express';
import { updateContact} from '../controllers/contactControllers.js';


const router = express.Router();



router.put('/:id', updateContact);



export default router; 