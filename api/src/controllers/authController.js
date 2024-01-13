const User = require('../models/User')
const bcrypt = require('bcrypt')
const validateUser = require("../validation/validateUser")
const jwt = require('jsonwebtoken')

//REGISTER
const register = async (req, res, next) => {
    let {firstName, lastName, username, email, phoneNumber, password, address} = req.body

    try {

        const {error} = validateUser(req.body)
        if(error) return res.status(404).json({success: false, message: error.details[0].message})

        const findUsername = await User.findOne({username})
      
        if(findUsername) return res.status(400).json({
            success: false,
            message:"Username exist"
        })
      
        const findEmail = await User.findOne({email})
      
        if(findEmail) return res.status(400).json({
            success: false,
            message:"Email exist"
        })
        
        //hashing the password
        let hashedpassword = await bcrypt.hash(password, 12)
        //re-assigning the passowrd
        password = hashedpassword

        const newUser = await User.create({firstName, lastName, username, email, phoneNumber, password, address});
        newUser.save()

        res.status(201).json({
            message: 'User Created',
        })

    }catch(error){
        res.status(404).json({
            success: false,
            message: "A server error has occured"
        });
    }
}


const login = async (req, res, next) => {

    try{

    const user = await User.findOne({ username: req.body.username })

    if(!user){
        return res.status(401).json({
            success: false,
            message: "Incorrect username or password"
        })
    }

    // !user && res.status(401).json("Incorrect username or password");

    const validPassowrd = await bcrypt.compare(req.body.password, user.password);

    if(!validPassowrd){
        return res.status(401).json({
            sucesss: false,
            message: "Incorrect username or password"
        })
    }

    // validPassowrd !== req.body.password &&
    //   res.status(401).json("Incorrect username or password");

    const accessToken = jwt.sign({
        id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SEC, {expiresIn: '3d'})

    const  { password, ...others } = user._doc

    res.status(200).json({
        success: true,
        message: "Successfull",
        token: accessToken,
        // data: {...others}
    })

    }catch(err){
        return res.status(404).json({
            success: false,
            message: "Unable to login",
            data: err
        })
    }


}

module.exports = {
    register,
    login
}