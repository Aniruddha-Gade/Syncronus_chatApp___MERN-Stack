import User from "../models/userModel.js";







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



// ====================== SEARCH CONTACTS ======================
export const getAllContacts = async (req, res) => {
    try {
        
        const contacts = await User.find();
        

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
