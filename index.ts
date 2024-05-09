import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { dirname } from 'path';
import cors from 'cors'
import 'dotenv/config';


// routes imports
import webViewRouter from './routes/staticRoutes';
import userRouter from './routes/userRoutes';
import queryRouter from './routes/queryRoutes';
import contactRouter from './routes/contactRoute';
import startGraphQlServer from './graphql/server';

//express app
const app = express();

const __dirname = dirname(process.cwd());

// data parsers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

// cors policy handler
app.use(cors())

app.use(express.static(__dirname + '/expressApp/public/'));


// app.use('/graphql', )

// set the template engine as ejs
app.set('view engine', 'ejs');

// web view routes
app.use('/', webViewRouter);

// user  api routes
app.use('/users', userRouter);

app.use('/query', queryRouter);


// mail routes

app.use('/contact', contactRouter);


startGraphQlServer();
// run the server
app.listen(process.env.PORT, ()=>{
    console.log('server is running on port', process.env.PORT);
})