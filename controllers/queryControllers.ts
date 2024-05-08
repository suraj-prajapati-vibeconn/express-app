import prisma from "../database/db";
import { createToken } from "../utils/session";
import { IUserRequest } from "../types/userRequests";
import { Response, Request } from "express";

const createData = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    
    const queryRes: any = await prisma.user_details.findFirst({
      where:{
        name:username,
        password:password
      }
    })
    // console.log(queryRes);
    if (queryRes) {
      const token = createToken(queryRes);
      res.cookie("token", token);
      res.redirect("/");
    } else {
      res.redirect("/login?error=unauthorizedacess");
    }
  } catch (error: any) {
    console.log(error)
    res.status(200).send({
      success: false,
      error: error.message,
      message: "Error ocurred",
    });
  }
};

const getData = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    // console.log(username, password);
    const queryRes: any = await prisma.user_details.create({data:{
      name:username,
      password:password,
      email:'email'

    }})
    const token = createToken(queryRes);
    res.cookie("token", token);
    res.redirect("/");
  } catch (error:any) {
    console.log(error)
    res.status(200).send({
      success: false,
      error: error.message,
      message: "Error ocurred",
    });
  }
};

const select = (req:Request, res:Response) => {
  try {
    const {groupType, actionType} = req.body;
    console.log(groupType,actionType,'r')
    res.redirect(`/?groupType=${groupType}&actionType=${actionType}`);
  // }  
  } catch (error) {
    res.redirect("/");
  }
};

export { createData, getData, select };
