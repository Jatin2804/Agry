import bcrypt from 'bcrypt';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Handle __dirname compatibility with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve database file path safely
const dbFilePath = path.join(__dirname, '../db/db.json');

// Helper function to read from db.json
async function readDB() {
  try {
    const data = await fs.readFile(dbFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database file:', error);
    return { users: [] }; // Return an empty user list if the file doesn't exist yet
  }
}

// Helper function to write to db.json
async function writeDB(data) {
  try {
    await fs.writeFile(dbFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing to database file:', error);
    throw error;
  }
}

// Register new user
export async function registerUser(req, res) {
  const { username, email, password } = req.body;

  const db = await readDB();

  // Check if the user already exists
  const userExists = db.users.find(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password before saving to database
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { 
    id: Date.now(), 
    username, 
    email, 
    password: hashedPassword 
  };

  db.users.push(newUser);

  await writeDB(db);

  res.status(201).json({ message: 'User registered successfully', user: { id: newUser.id, username, email } });
}
export async function loginUser(req, res) {
  const { email, password } = req.body;

  console.log("Received credentials: ", { email, password });

  const db = await readDB();
  const user = db.users.find(user => user.email === email);

  console.log("User found:", user);

  if (!user) {
    console.log("No user found");
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    console.log("Password mismatch");
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  console.log("Successful login");
  res.status(200).json({
    message: 'Login successful',
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });
}

