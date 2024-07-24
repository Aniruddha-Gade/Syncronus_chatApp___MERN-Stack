import { Router } from 'express'
import { createChannel } from "../controllers/ChannelController.js";
import { verifyToken } from './../middlewares/AuthMiddleware.js';


const ChannelRoutes = Router()

ChannelRoutes.post('/create-channel', verifyToken, createChannel)



export default ChannelRoutes