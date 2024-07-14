import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'
import { compare } from 'bcrypt';


const tokenExpireTime = 3 * 24 * 60 * 60 * 1000

// create token by JWT
const createToken = (email, password, userId) => {
    return jwt.sign({ email, password, userId }, process.env.JWT_KEY, {
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
        res.cookie("jwt", createToken(email, password, user._id), {
            tokenExpireTime,
            secure: true,
            sameSite: 'None'
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



// ====================== LOGIN ======================
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required..!'
            });
        }

        // find user
        const user = await User.findOne({ email });

        // if not found ,then say to register
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User is not registered'
            });
        }

        // check password
        const checkPassword = await compare(password, user.password)
        if (!checkPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password is incorrect'
            });
        }

        // set cookies
        res.cookie("jwt", createToken(email, password, user._id), {
            tokenExpireTime,
            secure: true,
            sameSite: 'None'
        })

        // erase password from user object , not from database
        user.password = undefined

        // return success message
        return res.status(200).json({
            user,
            success: true,
            message: 'User logged Successfully'
        });

    } catch (error) {
        console.log("Error while loging user => ", error)
        res.status(401).json({
            message: 'Error while loging user',
            error: error.message
        })
    }
}



// ====================== GET USER INFO ======================
export const getUserInfo = async (req, res, next) => {
    try {
        const userId = req.userId;
        console.log("userId = ", userId)
        if (!userId) {
            console.log('userId not found')
            return res.status(400).json({
                success: false,
                message: 'userId not found with given ID'
            });
        }

        // find user
        const user = await User.findById(userId);
        console.log("user-info = ", user)

        // if not found
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // erase password from user object , not from database
        user.password = undefined

        // return success message
        return res.status(200).json({
            user,
            success: true,
            message: 'User-info found Successfully'
        });

    } catch (error) {
        console.log("Error while getting user-info => ", error)
        res.status(500).json({
            message: 'Error while getting user-info',
            error: error.message
        })
    }
}

