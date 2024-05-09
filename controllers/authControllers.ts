import prisma from "../database/db";
import { createHashedPassword, createToken, validateHashedPassword, } from "../utils/session";
import { IUserRequest } from "../types/userRequests";
import { Response } from "express";

const verifyUser = async (req: IUserRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    const userData = await prisma.user_details.findFirst({
      where: {
        email: email,
      },
      include: {
        roles: {
          select: {
            uid: true
          }
        },

      }
    })
    if (userData) {
      const passwordMatched = await validateHashedPassword(password, userData.password);
      if (passwordMatched) {
        const token = createToken(userData);
        res.cookie("token", token);
        res.redirect("/");
      } else {
        res.redirect("/login?error=invalid credentials");
      }
    } else {
      res.redirect("/login?error=invalid credentials");
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error ocurred",
    });
  }
};


const createUser = async (req: IUserRequest, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await createHashedPassword(password);

    const userCreatedQueryRes = await prisma.user_details.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword
      }
    })

    const rolesCreatedQueryRes = await prisma.roles.create({
      data: {
        uid: userCreatedQueryRes.uid,
        admin: true,
        user: true
      }
    });

    if (rolesCreatedQueryRes) {
      const token = createToken({ ...rolesCreatedQueryRes, name, email });
      res.cookie("token", token);
      res.redirect("/");
    } else {
      res.redirect(500, '/login?error=error while creating account.');
    }

  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error ocurred",
    });
  }
};

const logOut = (req: IUserRequest, res: Response) => {
  try {
    res.cookie('token', '');
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

export { verifyUser, createUser, logOut };
