const User = require('../models/User')
const bcrypt = require('bcrypt')

// UPDATE USER
const updateUser = async (req, res, next) => {
    if(req.body.password){
        req.body.password = await bcrypt.hash(req.body.password, 12)
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})

        res.status(200).json({
            success: true,
            message: 'Successfully updated your account',
            data: updatedUser
        })

    } catch(error){
        res.status(200).json({
            success: false,
            message: 'Unable to update your account, something went wrong',
            data: error
        })
    }
}

//GET USER
const getUser = async (req, res, next) => {

    try{
        const user = await User.findById(req.params.id)
        const  { password, ...others } = user._doc

        res.status(200).json({
                success: true,
                message: "Retrieved User",
                data: {...others }
            })
    } catch(error){
        res.status(500).json({
            success: false,
            message: 'Unable to get user',
            data: error
        })
    }
}

//GET ALL USER
const getAllUser = async (req, res, next) => {

    const query = req.query.new
    try{
        const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find()
        res.status(200).json({
                success: true,
                message: "Retrieved all users",
                data: users 
            })
    } catch(error){
        res.status(500).json({
            success: false,
            message: 'Unable to get all user',
            data: error
        })
    }
}

//GET USER STATS
const getStats = async (req, res, next) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() -1));

    try{

        const data = await User.aggregate([
            { $match: { createdAt: {$gte: lastYear } } },
            {
                $project: {
                    month: { $month : "$createdAt" }
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ])

        res.status(200).json({
            success: true,
            message: 'Successfully Retrieved Users Statistics',
            data: data
        })

    }catch(error){
        res.status(500).json({
            success: false,
            message:'Unable to retrieve users statistics',
            data: error
        })
    }
}

//DELETE USER
const deleteUser = async (req, res, next) => {

    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: 'Account has been deleted....'
        })
    } catch(error){
        res.status(500).json({
            success: false,
            message: 'Unable to delete account',
            data: error
        })
    }
}


module.exports = {
    updateUser,
    getUser,
    getAllUser,
    getStats,
    deleteUser
}