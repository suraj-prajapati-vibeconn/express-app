import prisma from "../database/db";
import { createToken } from "../utils/session";
import { IUserRequest } from "../types/userRequests";
import { Response, Request } from "express";
import User from "../models/userModel";

const createData = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    
    const queryRes: any = await User.findAll({
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
      res.redirect("/login");
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
    const queryRes: any = await User.create({
      name:username,
      password:password,
      isAdmin:true
    })

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
