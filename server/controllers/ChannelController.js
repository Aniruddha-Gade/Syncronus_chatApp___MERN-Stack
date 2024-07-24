import mongoose from "mongoose";
import User from "../models/userModel.js";
import Channel from './../models/channelModel.js';





// ====================== CREATE CHANNEL ======================
export const createChannel = async (req, res) => {
    try {
        const { members, channelName } = req.body;
        const { userId } = req;

        // validate data
        if (!members || !channelName) {
            return res.status(404).json({
                success: false,
                message: 'Members and channel name required'
            });
        }

        // find admin
        const admin = await User.findById(userId);
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found..!'
            });
        }

        // check all members are valid or not
        const validMembers = await User.find({
            _id: { $in: members }
        }, "_id");
        // console.log("validMembers = ", validMembers);


        // if some members not found
        if (validMembers.length !== members.length) {
            return res.status(400).json({
                success: false,
                message: 'Some members are not found'
            });
        }


        // create new channel
        const newChannel = await Channel.create({
            members,
            channelName,
            admin: userId
        });

        // to call pre method to update 'updateAt' value
        await newChannel.save();

        // return success response
        return res.status(200).json({
            channel: newChannel,
            success: true,
            message: 'New channel created successfully'
        });

    } catch (error) {
        console.log("Error while creating new channel => ", error);
        res.status(500).json({
            message: 'Error while creating new channel',
            error: error.message
        });
    }
};
