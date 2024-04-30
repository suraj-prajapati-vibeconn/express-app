import { verifyToken } from '../utils/session';
import express from 'express';
import { IUserRequest } from '../types/userRequests';


export const isValidUser = async (req: IUserRequest, res:express.Response, next:express.NextFunction)=>{
    try {
        const token = req.cookies?.token;
        if(!token){
            return res.redirect('/login');
        }
        const user = verifyToken(token);
        if(!user){
            console.log('user not found')
            return res.redirect('/login')
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.send({
            success:false,
            message:'Error occured',
            error
        })
    }

}

export const isAdmin = async (req:IUserRequest, res:express.Response, next:express.NextFunction) =>{

    const {isAdmin} = req?.user;
    try {
        if(isAdmin){
            next();
        }else{
            res.send({
                success:true,
                message:'Unauthorized access.',
            })
        }
        
    } catch (error) {
        console.log(error);
        res.send({
            success:false,
            message:'Error occured',
            error
        })
    }
}

