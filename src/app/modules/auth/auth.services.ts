import mongoose from "mongoose";
import { TUser, TUserLogin } from "./auth.interface";
import { AuthUser } from "./auth.model";
import AppError from "../../error/AppError";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../../config";
import { createToken } from "./auth.utils";
import { generateUserId } from "../../utils/generateUserId";


// create user services
const createUserIntoDB = async (payload: TUser) => {
    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        payload.id = await generateUserId()
        const newUser = await AuthUser.create([payload], {session})
        
        if (!newUser) {
            throw new AppError(400, 'Failed to create user !'); 
        }
        await session.commitTransaction()
        await session.endSession()
        return newUser
    } catch (error: any) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(400, error)
    }
}

// login user services
const loginUserServices = async (payload: TUserLogin) => {
    const user = await AuthUser.isUserExistsById(payload.id)
    if (!user) {
        throw new AppError(404, 'This user is not found !')
    }
    const passMatch = await AuthUser.isPasswordMatch(payload.password, user.password)

    if (!passMatch) {
        throw new AppError(403, 'Invalid credentials')
    }

    const isBlocked = user.isBlocked
    if (isBlocked) {
        throw new AppError(403, 'This user is blocked !')
    }

    // create token and sent to the user
    const jwtPaylod = {
        email: user.id,
        role: user.role as string
    }

    const accessToken = createToken(jwtPaylod, config.jwt_access_secret as string, config.jwt_access_expires_in as string)
    const refreshToken = createToken(jwtPaylod, config.jwt_refresh_secret as string, config.jwt_refresh_expires_in as string)

    return { accessToken, refreshToken }

}

// refresh token services 
const refreshToken = async (token: string) => {

    const decoded = jwt.verify(token, config.jwt_refresh_secret as string) as JwtPayload

    const { id, iat } = decoded;
    const user = await AuthUser.isUserExistsById(id);

    if (!user) {
        throw new AppError(404, 'This user is not found !');
      }
  
      if (user?.isBlocked) {
        throw new AppError(401, 'This user is blocked !');
      }

    const jwtPayload = {
        email: user.id,
        role: user.role as string,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    );

    return {
        accessToken,
    };
};


export const authUserServices = {
    createUserIntoDB,
    loginUserServices,
    refreshToken
}