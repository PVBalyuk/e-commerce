import User from "../../models/userModel";
import { UserService } from "../../services/userServices.js/userService";
import { generateTokens, decodeRefreshToken } from "../../token-utils/utils";

class UserControllerClass {
    async registrationHandler(req, res) {
        const user = await UserService.registration(req, res);
        
        if (!user) {
            return
        }
        return res.status(201).send(user)
    }


    async loginHandler (req, res) {
        const data = await UserService.login(req, res);

        if (!data) {
            return
        }
        res.cookie('refreshToken', data.tokens.refreshToken, { maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true });
        
        return res.status(200).json({ messages: 'all good', tokens: data.tokens, email: data.email, isAdmin: data.isAdmin })
    }

    async logoutHandler (req, res) {
        const isSuccessfulLogout = await UserService.logout(req, res);

        if (!isSuccessfulLogout) {
            return
        }
        
        res.clearCookie('refreshToken');

        return res.status(200).json({message: 'Logged out'});
    }

    async getUserStatus(req, res) {   
        const decodedAccessToken = await UserService.getUserStatus(req);
        
        if (!decodedAccessToken) {
            return res.status(401).json({message: 'expired access token'})
        }

        const userData = await UserService.findUserById(decodedAccessToken.userId);

        if (!userData) {
            return
        }

        return res.status(200).json({isAdmin: userData.isAdmin, isAuthed: true, email: userData.email });
    }

    async refreshTokens (req, res) {
        const {refreshToken} = req.cookies;
        if (!refreshToken) {
            return res.status(401).json({ message: 'unauthorized, need to re-login' });
        }

        const decodedRefreshToken = decodeRefreshToken(refreshToken);
        if (!decodedRefreshToken) {
            return res.status(401).json({ message: 'unauthorized, need to re-login' });
        }

        const user = await UserService.findUserById(decodedRefreshToken.userId);

        const tokens = generateTokens(user.email, user._id);

        await User.updateOne({ email: user.email}, { refreshToken: tokens.refreshToken })

        res.cookie('refreshToken', tokens.refreshToken, { maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true });

        return res.status(200).json({accessToken: tokens.accessToken})
    
    }

}

export const UserController = new UserControllerClass();