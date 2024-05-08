import { verifyToken } from '../utils/session';
import express from 'express';
import { IUserRequest } from '../types/userRequests';


export const isAuthenticated = async (req: IUserRequest, res: express.Response, next: express.NextFunction) => {
    try {

        const acceptTypes = req.accepts();


        // ssr page request from browser
        if (acceptTypes.includes('text/html')) {
            let token = req.cookies?.token;
            if (!token) {
                return res.redirect('/login?error=unauthorized access');
            }
            const authData = verifyToken(token);
            if (authData.success) {
                req.authData = authData.data;
                next();
                return;
            }
            return res.redirect('/login?error=unauthorized access');

            // client side api call request
        } else {
            let token = req.headers.authorization;
            if (!token) {
                return res.status(401).send({
                    success: false,
                    message: 'Unauthorized access',
                });
            }
            const authData = verifyToken(token);
            if (authData.success) {
                req.authData = authData.data;
                next();
                return;
            }
            return res.redirect('/login?error=unauthorized access');

        }



    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error occured',
            error
        })
    }

}

export const isAuthorized = async (req: IUserRequest, res: express.Response, next: express.NextFunction) => {

    const { admin } = req?.authData;

    try {
        if (admin) {
            next();
        } else {
            const acceptTypes = req.accepts();
            if (acceptTypes.includes('text/html')) {
                return res.redirect('/login?error=unauthorized access');
            }
            // client side api call response
            else {
                return res.status(403).send({
                    success: false,
                    message: 'Unauthorized access',
                })

            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error occured',
            error
        })
    }
}

