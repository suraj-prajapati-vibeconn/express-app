import {Request} from "express"
export interface IUserRequest extends Request {
    user?: any
}

// interface IUserResponse extends express.Request {
//     user: any
// }