import User from "../../models/userModel";
import bcrypt from 'bcryptjs';
import { hashPassword } from "../../validators/userValidators";
import { decodeRefreshToken, generateTokens, decodeAccessToken } from '../../token-utils/utils'


class UserServiceClass {
    async findUserById (userId) {
        const user = await User.findById(userId);

        return user;
    }


    async login(req, res) {
        try {
            const { loginName, password } = req.body
            const isLoginNameEqualToEmail = await User.findOne({ email: loginName });
            const isLoginNameEqualToUserName = await User.findOne({ userName: loginName });
            const isLoginNameEqualToPhoneNumber = await User.findOne({ phoneNumber: loginName });
            const user = isLoginNameEqualToEmail || isLoginNameEqualToUserName || isLoginNameEqualToPhoneNumber;

            if (!user) {
                res.status(404).json({ message: "No such user"});
                return false;
            };
    
            const isPasswordValid = await bcrypt.compare(password, user.password);
    
            if(!isPasswordValid) {
                res.status(404).json({ message: "Invalid password"});
                return false;
            }
    
            const tokens = generateTokens(user.email, user.id);
    
            await User.updateOne({ email: user.email }, { refreshToken: tokens.refreshToken });

            const data = {tokens, email: user.email, isAdmin: user.isAdmin }

            return data
        } catch(e) {
            console.log(e);
        }
        
    }

    async registration(req, res) {
        try {
            const { userName, email, phoneNumber, password } = req.body;
            const isUserNameAvailable = await User.findOne({ userName });   
            const isEmailAvailable = await User.findOne({ email });   
            const isPhoneNumberAvailable = await User.findOne({ phoneNumber });   

            if(isUserNameAvailable) {
                res.status(404).json({message: 'Error. User with this userName exists'});
                return false
            };
            if (isEmailAvailable) {
                res.status(404).json({ message: 'Error. User with this email exists'});
                return false
            };
            if(isPhoneNumberAvailable) {
                res.status(404).json({ message: 'Error. This phone number already in use'});
                return false 
            };
    
            const hashedPassword = await hashPassword(password);
    
            const user = await User.create({userName, email, phoneNumber, password: hashedPassword });
    
            return user;
        } catch (e) {
            console.log(e); 
        }
        
    }

    async logout(req, res) {
        try {
            const { refreshToken } = req.cookies;

            if (!refreshToken) {
              res.status(401).json({message: 'Something went wrong'})
              return false
            }
        
            const decoded = decodeRefreshToken(refreshToken);
    
            const user = await User.findById({ _id: decoded.userId });
    
            if (!user) {
                res.status(404).json({ message: 'Invalid request' });

                return false
            }
    
            await User.updateOne({ _id: user._id}, { refreshToken: null })

            return true
        } catch (e) {
            console.log(e);
        }
        
    }

    

    async getUserStatus(req) {
        try {
            const { authorization } = req.headers;
            const accessToken = authorization.split(' ')[1];

            const decodedAccessToken = decodeAccessToken(accessToken);

            return decodedAccessToken
        } catch (e) {
            console.log(e)
        }
    }

}

export const UserService = new UserServiceClass();