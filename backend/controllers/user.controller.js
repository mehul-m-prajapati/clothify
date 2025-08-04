
import UserModel from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import validator from 'validator'


const createToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET);
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});

        if (!user)
            return res.status(400).json({message: "User doesn't exist"});

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.status(400).json({message: 'Invalid password' });

        const token = createToken(user._id);

        res.status(200).json({
            message: 'User signed in successfully',
            data: {
                token,
                user,
            },
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const registerUser = async (req, res) => {

    try {
        const {name, email, password} = req.body;

        const isUser = await UserModel.findOne({email});
        if (isUser)
            return res.status(400).json({message: "User with same email-id already exists"});

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Please enter a valid email' });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: 'Password should be at least 6 characters',
            });
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPasswd = await bcrypt.hash(password, salt);
        const user = await UserModel.create({name, email, password: hashedPasswd});

        let token = createToken(user._id);

        return res.status(201).json({
            message: "User registered successfuly",
            data: {
                user,
                token
            }
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            let token = jwt.sign(email+password, process.env.JWT_SECRET);
            return res.status(200).json({message: 'Admin signed in successfully', data: {token}})
        }
        else {
            return res.status(400).json({message: 'Invalid admin email or password'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


export {
    loginUser,
    registerUser,
    adminLogin
}
