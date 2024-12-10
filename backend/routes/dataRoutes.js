import express from 'express';
import { getAllCategories, getByCategories } from '../controllers/dataController.js';
import { validateDataInput } from '../middlewares/validateDataInput.js';

const router = express.Router();

// Route to fetch all categories
router.get('/', validateDataInput, getAllCategories);

// Route to fetch a specific category by query parameter
router.get('/:category', validateDataInput, getByCategories);

export default router;
