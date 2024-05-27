import express from 'express';
import { showAllContacts} from '../controllers/contactControllers.js';


const router = express.Router();


router.get('/contacts', showAllContacts);


export default router; 