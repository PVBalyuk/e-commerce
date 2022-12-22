import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
import { SECRET_KEY_CONFIG} from '../configs/authConfig';
dotenv.config();

export const decodeAccessToken = (accessToken) => {
    const decoded = jwt.verify(accessToken, process.env.SECRET_KEY_ACCESS);

    return decoded; 
}

export const decodeRefreshToken = (refreshToken) => {
    const decoded = jwt.verify(refreshToken, process.env.SECRET_KET_REFRESH);

    return decoded;
}

export const generateTokens = (userEmail, userId) => {
    const accessToken = jwt.sign({userEmail, userId}, SECRET_KEY_CONFIG.secretKeyAccessToken, {
        expiresIn: SECRET_KEY_CONFIG.expiresInAccess,
    });
    const refreshToken = jwt.sign({userEmail, userId}, SECRET_KEY_CONFIG.secretKeyRefreshToken, {
        expiresIn: SECRET_KEY_CONFIG.expiresInRefresh,
    })
    
    return { accessToken, refreshToken }
}