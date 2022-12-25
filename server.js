import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productsRouter from './routes/products.js';
import loginRouter from './routes/logins.js';
import bestSellersRouter from './routes/bestSellers.js';
import newLaunchesRouter from './routes/newLaunches.js';
import subscribeRouter from './routes/subscribe.js';
import orderRouter from './routes/order.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
dotenv.config();

const app = express();

//database
const connect = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log('mongodb coonected');
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on('disconnected', () => {
  console.log('database disconnected');
});

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/bestSeller', bestSellersRouter);
app.use('/api/newLaunch', newLaunchesRouter);
app.use('/api/products', productsRouter);
app.use('/api/login', loginRouter);
app.use('/api/subscribe', subscribeRouter);
app.use('/api/order', orderRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, './build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Somethimg went wrong';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

//server connect
const port = process.env.PORT || 5000;
app.listen(port, () => {
  connect();
  console.log('server is ready');
});
