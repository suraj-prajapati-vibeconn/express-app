import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// import dotenv from 'dotenv';
import path, { dirname } from 'path';
const __dirname = dirname(process.cwd());

import 'dotenv/config';
// require('dotenv').config();
// console.log(,'dir')
// dotenv.config({path: path.resolve(__dirname+'/.env')});
const app = express();

// import express from 'express';
// import 

// routes
import webViewRouter from './routes/staticRoutes';
import userRouter from './routes/userRoutes';

// data parsers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use(express.static(__dirname + '/public'));
// set the template engine as ejs
app.set('view engine', 'ejs');
// web view routes
app.use('/', webViewRouter)

// user  api routes
app.use('/users', userRouter);

// run the server
app.listen(process.env.PORT, ()=>{
    console.log('server is running', process.env.PORT);
})