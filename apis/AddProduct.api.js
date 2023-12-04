// product.js
import express from 'express';
import Product from '../models/product.models.js';
import { generateAdminToken } from '../auth.js';

const router = express.Router();

router.post('/add_products', async (req, res) => {
  try {
    const { username, password } = req.body;
    const authResult = generateAdminToken(username, password);

    if (authResult.success) {
      // Include the token in the response for the client to use in subsequent requests
      return res.status(200).json({ message: 'Login successful', token: authResult.token });
    } else {
      return res.status(401).json({ error: authResult.error });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
export default router;
