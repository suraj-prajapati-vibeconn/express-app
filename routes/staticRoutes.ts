import express from 'express';
import { isValidUser, isAdmin } from '../middlewares/auth.middlewares';
import { IUserRequest } from '../types/userRequests';

const webViewRouter = express.Router();

// protected user routes
webViewRouter.get('/', isValidUser, (req:IUserRequest, res:express.Response)=>{
    const {name} = req.user;
    res.render('index.ejs', {title:'Home Page', username:name})
})

webViewRouter.get('/about', isValidUser, (req:IUserRequest, res:express.Response)=>{
    const {name} = req.user;
    res.render('about.ejs', {title:'About', username:name});
})

// protected admin page
webViewRouter.get('/dashboard', isValidUser, isAdmin, (req:IUserRequest, res:express.Response)=>{
    const {name} = req.user;
    res.render('dashboard.ejs', {title:'Dashboard', username:name});
})


// authentication routes
webViewRouter.get('/login',(req, res)=>{
    res.render('form.ejs', { type: 'login', title:'Login', alternateRoute:'signup'})
})

webViewRouter.get('/signup',(req, res)=>{
    res.render('form.ejs', { type: 'signup', title:'Sign up', alternateRoute:'login' })
})

export default webViewRouter;