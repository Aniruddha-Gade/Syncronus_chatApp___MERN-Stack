import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'


const tokenExpireTime = 3 * 24 * 60 * 60 * 1000

// create token by JWT
const createToken = (email, password) => {
    return jwt.sign({ email, password }, process.env.JWT_KEY, {
        expiresIn: tokenExpireTime
    })
}

// ====================== SIGN-UP ======================
export const signup = async (req, res, next) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required..!'
            });
        }

        // check user have registered already
        const checkUserAlreadyExits = await User.findOne({ email });

        // if yes ,then say to login
        if (checkUserAlreadyExits) {
            return res.status(400).json({
                success: false,
                message: 'User registered already, go to Login Page'
            });
        }


        const user = await User.create({ email, password })


        // set cookies
        res.cookie("jwt", createToken(email, password), {
            tokenExpireTime,
            secure: true,
            sameSite: 'none'
        })

        // return success message
        return res.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup
            },
            success: true,
            message: 'User Registered Successfully'
        });

    } catch (error) {
        console.log("Error while creating user data => ", error)
        res.status(401).json({
            message: 'Error while creating user data',
            error: error.message
        })
    }
} 