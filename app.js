// app.js
import express from 'express';
import pkg from 'body-parser';
import cors from 'cors';
import connectDB from './Db.js'
import { authenticateAdmin } from './auth.js';
import productRoutes from "./apis/Product.api.js"
import addProductRoutes from './apis/AddProduct.api.js'
import authRoutes from "./apis/Auth.api.js"

const { json } = pkg;
const app = express();

app.use(cors());
app.use(json());

// Connect to MongoDB
connectDB();
app.use('/api/auth', authRoutes);
app.use('/api/add_products', authenticateAdmin, addProductRoutes);
app.use('/api/products', productRoutes);


export default app;
