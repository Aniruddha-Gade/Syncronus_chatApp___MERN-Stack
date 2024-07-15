import jwt from "jsonwebtoken";


export const verifyToken = async (req, res, next) => {
    // extract token by anyone from this 3 ways
    const token = req.body?.token || req.cookie?.token

    // if token is undefined
    if (!token) {
        return res.status(401).json({
            status: false,
            message: 'Token is Missing'
        })
    }

    // console.log('Token ==> ', token);
    // console.log('From body -> ', req.body?.token);
    // console.log('from cookies -> ', req.cookies?.token);
    // console.log('from headers -> ', req.header('Authorization')?.replace('Bearer ', ''));


    jwt.verify(token, process.env.JWT_KEY, (error, payload) => {
        console.log('verified decode token => ', payload);
        // invalid token
        if (error) {
            return res.status(403).json({
                status: false,
                message: 'Token is invalid'
            })
        }

        // store userId in req body
        req.userId = payload.userId
        next() // go to next middleware
    })
}