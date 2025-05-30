import express from 'express';
import {signup} from "../controllers/signUpControllers.js";
import {login} from "../controllers/logInControllers.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;
