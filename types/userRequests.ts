import {Request} from "express"
export interface IUserRequest extends Request {
    authData?: any
}
