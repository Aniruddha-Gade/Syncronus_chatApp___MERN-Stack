import jwt from "jsonwebtoken";


export const verifyToken = async (req, res, next) => {

    // console.log('req.cookies = ', req.cookies.jwt)
    const token = req.cookies.jwt;

    // if token is undefined
    if (!token) {
        return res.status(401).json({
            status: false,
            message: 'You are not authenticated..!'
        })
    }

    jwt.verify(token, process.env.JWT_KEY, (error, payload) => {
        // invalid token
        if (error) {
            return res.status(403).json({
                status: false,
                message: 'Token is invalid'
            })
        }

        // store userId in req body
        req.userId = payload.userId
        next()
    })
}