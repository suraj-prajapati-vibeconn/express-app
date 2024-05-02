import sequelize from "../database/db";
// import { verifyUserQuery, creatUserQuery } from "../queries/authQueries";
// import { v4 as uid } from "uuid";
import { createToken } from "../utils/session";
import { IUserRequest } from "../types/userRequests";
import { Response } from "express";
import User from '../models/userModel'

const verifyUser = async (req: IUserRequest, res: Response) => {
  try {
    const { username, password } = req.body;
    // console.log(username, password);
    const queryRes: any = await User.findOne({
      where:{
        name:username,
        password:password
      }
    })
    console.log(queryRes);
    if (queryRes) {
      const token = createToken(queryRes.dataValues);
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

const createUser = async (req: IUserRequest, res: Response) => {
  try {
    const { username, password } = req.body;
    // console.log(username, password);
    const queryRes: any = await User.create({
      name:username,
      password:password,
      isAdmin:false
    })

    const token = createToken(queryRes.dataValues);
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

const logOut = (req:IUserRequest, res:Response) => {
  try {
    res.cookie('token', '');
    // const userRemoved = removeUser(uid);
    // if (userRemoved) {
    res.redirect("/login");
    // }
  } catch (error) {
    res.redirect("/");
  }
};

export { verifyUser, createUser, logOut };
