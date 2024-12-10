import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { validateRegisterInput, validateLoginInput } from '../middlewares/validateAuthInput.js';

const router = express.Router();

// Register Route
router.post('/register', validateRegisterInput, registerUser);

// Login Route
router.post('/login', validateLoginInput, loginUser);

export default router;
