import mongoose from "mongoose";
import User from "../models/userModel.js";
import Message from './../models/messageModel.js';







// ====================== SEARCH CONTACTS ======================
export const searchContacts = async (req, res) => {
    try {
        const { searchTerm } = req.body;

        if (!searchTerm) {
            return res.status(400).json("searchTerm is required.");
        }

        const sanitizedSearchTerm = searchTerm.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );

        const regex = new RegExp(sanitizedSearchTerm, "i");

        const contacts = await User.find({
            $and: [
                { _id: { $ne: req.userId } },
                {
                    $or: [{ firstName: regex }, { lastName: regex }, { email: regex }],
                },
            ],
        });

        return res.status(200).json({
            contacts,
            success: true,
            message: 'Search contacts fetched successfully'
        });
    } catch (error) {
        console.log(error);
        console.log("Error while searching contacts => ", error)
        res.status(500).json({
            message: 'Error while searching contacts',
            error: error.message
        })
    }
}



// ====================== GET CONTACT FOR DM LIST ======================
export const getContactsForDMList = async (req, res) => {
    try {

        let { userId } = req
        userId = new mongoose.Types.ObjectId(userId)


        const contacts = await Message.aggregate([
            {
                $match: {
                    $or: [{ sender: userId }, { recipient: userId }]
                }
            },
            {
                $sort: { timestamp: -1 }
            },
            {
                $group: {
                    _id: {
                        $cond: {
                            if: { $eq: ["$sender", userId] },
                            then: "$recipient",
                            else: "$sender"
                        }
                    },
                    lastMessageTime: { $first: "$timestamp" }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "contactInfo"
                }
            },
            {
                $unwind: "$contactInfo"
            },
            {
                $project: {
                    _id: 1,
                    lastMessageTime: 1,
                    email: "$contactInfo.email",
                    firstName: "$contactInfo.firstName",
                    lastName: "$contactInfo.lastName",
                    image: "$contactInfo.image",
                    color: "$contactInfo.color"
                }
            },
            {
                $sort: { lastMessageTime: -1 }
            }
        ]);

        // console.log('contacts => ', contacts)



        return res.status(200).json({
            contacts,
            success: true,
            message: 'Search contacts fetched successfully'
        });
    } catch (error) {
        console.log(error);
        console.log("Error while searching contacts => ", error)
        res.status(500).json({
            message: 'Error while searching contacts',
            error: error.message
        })
    }
}
