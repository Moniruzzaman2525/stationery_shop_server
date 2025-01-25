import { Model, Types } from "mongoose";
import { USER_ROLE } from "./auth.constant";


export interface TUser {
    id: string;
    _id?: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role?: 'admin' | 'user';
    isBlocked?: boolean
}


export interface UserModel extends Model<TUser> {
    isUserExistsById(id: string): Promise<TUser>
    isPasswordMatch(plainTextPassword: string, hashPassword: string): Promise<boolean>
}

export type TUserLogin = {
    id: string;
    password: string
}

export type TUserRole = keyof typeof USER_ROLE