import express from 'express';
import prisma from '../database/db';
import sendMail from '../mail/sendMail';

const contactRouter = express.Router();

contactRouter.post('/', async (req, res)=>{
    try {
        const {name, email, message} = req.body;

        const savedMessage = await prisma.contact_messages.create({
            data:{
                name,
                email,
                message
            }
        })
        if(savedMessage){
            const mailSent =await sendMail({name, email});

            if(mailSent.success){
                res.redirect('/contact?success=Thankyou for contacting us ! we will contact you soon.')
            }else{
                res.redirect('/contact?error=some error occured ! please try later.')
            }
        }else{
            res.redirect('/contact?error=some error occured ! please try later.')
        }

    } catch (error) {
        
    }
    
});



export default contactRouter;