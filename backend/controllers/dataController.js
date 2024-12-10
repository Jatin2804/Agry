import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Handle __dirname for compatibility with ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the db.json file
const dbFilePath = path.join(__dirname, '../db/db.json');
console.log('Database file path:', dbFilePath); // Log the resolved path

// Fetch all categories like grains, fruits, etc.
const getAllCategories = (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8')); // Read and parse JSON data
    const { grains, fruits, vegetables, dryfruits } = data; // Extract categories
    res.status(200).json({ grains, fruits, vegetables, dryfruits });
  } catch (error) {
    console.error('Error reading database:', error);
    res.status(500).json({ error: 'Unable to fetch data from database' });
  }
};

// Fetch a specific category by request param
const getByCategories = (req, res) => {
  try {
    const { category } = req.params; // Get category from params
    const data = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8')); // Read and parse JSON data

    if (!data[category]) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json({ [category]: data[category] });
  } catch (error) {
    console.error('Error reading database:', error);
    res.status(500).json({ error: 'Unable to fetch data from database' });
  }
};

export { getAllCategories, getByCategories };
