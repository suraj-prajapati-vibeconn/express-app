import express from 'express';
import { isAuthenticated, isAuthorized } from '../middlewares/auth.middlewares';
import { IUserRequest } from '../types/userRequests';

const webViewRouter = express.Router();

// protected user routes
webViewRouter.get('/',isAuthenticated, (req:IUserRequest, res:express.Response)=>{
    const {groupType, actionType} = req.query;
    res.render('index.ejs', {title:'Home Page', username:'suraj', groupType, actionType})
})

webViewRouter.get('/about', isAuthenticated, (req:IUserRequest, res:express.Response)=>{
    const {name} = req.authData?.name;
    res.render('about.ejs', {title:'About', username:name});
})

// protected admin routes
webViewRouter.get('/dashboard', isAuthenticated, isAuthorized, (req:IUserRequest, res:express.Response)=>{
    const {name} = req.authData?.name;
    res.render('dashboard.ejs', {title:'Dashboard', username:name});
})


// authentication routes
webViewRouter.get('/login',(req, res)=>{
    const {error} = req.query;
    res.render('form.ejs', { type: 'login', title:'Login', alternateRoute:'signup', error})
})

webViewRouter.get('/signup',(req, res)=>{
    const {error} = req.query;
    res.render('form.ejs', { type: 'signup', title:'Sign up', alternateRoute:'login',error })
})



webViewRouter.get('/contact', (req:IUserRequest, res:express.Response)=>{
    const {success, error} = req.query;
    res.render('contact.ejs', {title:'Contact Us', success:success, error:error})
})
export default webViewRouter;