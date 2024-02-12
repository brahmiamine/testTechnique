import express from "express";
import routes from './api/routes/index';
import connectDB from "./config/db";
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}));

connectDB();

app.use(express.json());

app.get('/api', (req, res) => {
    res.send('API is working now...');
});

app.use('/api/v1', routes);

export default app;
