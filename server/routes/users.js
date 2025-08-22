
const express = require('express');
const router = express.Router();

// Mock user data - replace with actual database integration
const users = [
  { id: 1, username: 'admin', password: 'admin123' },
  { id: 2, username: 'user', password: 'user123' }
];

// Login endpoint
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ 
      error: 'Username and password are required' 
    });
  }
  
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({ 
      error: 'Invalid credentials' 
    });
  }
  
  // Generate a simple token (in production, use proper JWT)
  const token = `token_${user.id}_${Date.now()}`;
  
  res.json({
    message: 'Login successful',
    token,
    username: user.username,
    id: user.id
  });
});

// Get all users
router.get('/', (req, res) => {
  const safeUsers = users.map(({ password, ...user }) => user);
  res.json(safeUsers);
});

module.exports = router;
