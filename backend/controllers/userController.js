import jwt from "jsonwebtoken"; // Import jwt as default

import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";

const { sign } = jwt; // Destructure 'sign' from jwt

// Function to create JWT token
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
};

// Login user
const loginUser = async (req, res) => {
    const {email,password} = req.body;
try {
    const user = await userModel.findOne({email});

    if (!user) {
        return res.json({success:false,message:"User Doesn't exist"})
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if (!isMatch) {
        return res.json({success:false,message:"Invalid Credentials"});
    }

    const token = createToken(user._id);
    res.json({success:true,token})

} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
}
    
};

// Register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validate email and password strength
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        // Save the new user to the database
        const user = await newUser.save();
        const token = createToken(user._id); // Create JWT token
        res.json({ success: true, token }); 
        
        // Respond with the token
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { loginUser, registerUser };
