import express from 'express';
import { connectDB } from './config/db.js';  
import userRoutes from './routes/userRoutes.js';
import auth from './routes/auth.js';
import roleroute from './routes/roleroute.js';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB();

app.use('/api', userRoutes);
app.use('/api/auth', auth);
app.use('/api/users',roleroute );

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
