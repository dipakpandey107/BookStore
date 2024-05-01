import mongoose from "mongoose";
import User from "../model/user.model.js";

export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        } else {
            const newUser = new User({
                fullname,
                email,
                password,
            });
            const createdUser = await newUser.save();
            res.status(201).json({
                message: "User created successfully",
                user: {
                    _id: createdUser._id,
                    fullname: createdUser.fullname,
                    email: createdUser.email,
                },
            });
        }
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async(req,res)=>{
    try {
        
        const {email , password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            res.status(404).json({message:"User Not found"});
        }
        // check condition

        if(email!==user.email){
            res.status(404).json({message:"Email are invalid!!"});
        }

        if(password!==user.password){
            res.status(404).json({message:"Password are Invalid!!"})
        }

        res.status(200).json({message:"Login Successfully", user:user})

    } catch (error) {
        console.log("Something Wrong" , error);
        res.status(500).json({message:"Internal Server Error"})
    }
}