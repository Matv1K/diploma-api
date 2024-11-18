import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import instrumentRoutes from './routes/instruments/instrumentRoutes';
import userRoutes from './routes/users/userRoutes';
import cartRoutes from './routes/cart/cartRoutes';
import likedRoutes from './routes/liked/likedRoutes';
import ordersRoutes from './routes/orders/ordersRoutes';
import commentsRoutes from './routes/comments/commentsRoutes';

const server = express();

// MIDDLEWARES
server.use(express.json());
server.use(cors());

// ROUTES
server.get("/", (req, res) => {
  res.json("hey");
});

server.use('/instruments', instrumentRoutes);
server.use('/users', userRoutes);
server.use('/cart', cartRoutes);
server.use('/liked', likedRoutes);
server.use('/orders', ordersRoutes);
server.use('/comments', commentsRoutes);

// DB CONNECTION
mongoose
  .connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
  .then(() => console.log('MongoDB is connected'))
  .catch(() => console.log('Could not set the connection with MongoDB'));

// Export the server for Vercel
export default server;


// server.listen(port, () => console.log(Server is running on port ${port}...));