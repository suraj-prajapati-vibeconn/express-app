// const userSession = new Map();
import jsonwebtoken from "jsonwebtoken";
// const getUser = (uid) => {
//   return userSession.get(uid);
// };

// const setUser = (uid, user) => {
//   userSession.set(uid, user);
// };

// const removeUser = (uid) => {
//   return userSession.delete(uid);
// };
// console.log(process.env.PORT,"process")
const secret = process.env.JWT_SECRET_KEY as string;
export const createToken = (data:any) => {
  let token = jsonwebtoken.sign(data, secret);
  return token;
};

export const verifyToken = (token:string) => {
    var decoded = jsonwebtoken.verify(token, secret);
    return decoded;
  };
