import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
const secret = process.env.JWT_SECRET_KEY as string;


// create a jwt token for the logged in user
export const createToken = (data: any) => {
  let token = jsonwebtoken.sign(data, secret);
  return token;
};

// verify the jwt token
export const verifyToken = (token: string) => {
  try {
    var decodedData = jsonwebtoken.verify(token, secret);
    return {
      success: true,
      message: 'Authentication successful',
      data: decodedData
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'Invalid access token'
    }
  }
};


export const createHashedPassword = async (plainPassword: string) => {
  const SALTROUNDS = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainPassword, SALTROUNDS);
  return hashedPassword;
}

export const validateHashedPassword = async (plainPassword: string, hashedPassword:string)=>{
  return await bcrypt.compare(plainPassword, hashedPassword)
}