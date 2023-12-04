// auth.routes.js
import express from 'express';
import { generateAdminToken, authenticateAdmin } from '../auth.js';

const router = express.Router();

// Admin login
router.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const authResult = generateAdminToken(username, password);

    if (authResult.success) {
      return res.status(200).json({ message: 'Admin login successful', token: authResult.token });
    } else {
      return res.status(401).json({ error: authResult.error });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User login
router.post('/user/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const authResult = authenticateAdmin(username, password);

    if (authResult.success) {
      return res.status(200).json({ message: 'User login successful', token: authResult.token });
    } else {
      return res.status(401).json({ error: authResult.error });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
