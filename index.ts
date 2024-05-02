import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// import dotenv from 'dotenv';
import path, { dirname } from 'path';
const __dirname = dirname(process.cwd());

import 'dotenv/config';
const app = express();

// routes
import webViewRouter from './routes/staticRoutes';
import userRouter from './routes/userRoutes';
import queryRouter from './routes/queryRoutes';
import cors from 'cors'

// data parsers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors())

app.use(express.static(__dirname + '/expressApp/public'));

// set the template engine as ejs
app.set('view engine', 'ejs');

// web view routes
app.use('/', webViewRouter);

// user  api routes
app.use('/users', userRouter);

app.use('/query', queryRouter);

// run the server
app.listen(process.env.PORT, ()=>{
    console.log('server is running on port', process.env.PORT);
})