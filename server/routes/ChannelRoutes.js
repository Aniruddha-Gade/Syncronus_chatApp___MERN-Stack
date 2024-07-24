import { Router } from 'express'
import { createChannel, getUserChannels } from "../controllers/ChannelController.js";
import { verifyToken } from './../middlewares/AuthMiddleware.js';


const ChannelRoutes = Router()

ChannelRoutes.post('/create-channel', verifyToken, createChannel)
ChannelRoutes.get('/get-user-channels', verifyToken, getUserChannels)



export default ChannelRoutes