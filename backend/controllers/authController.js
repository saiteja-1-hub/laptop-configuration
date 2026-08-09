const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");


exports.register = async (req, res, next) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;

        if (!name || !email || !password) {
            throw new Error(
                "Name, email and password are required"
            );
        }

        const existingUser =
            await User.findByEmail(email);

        if (existingUser) {
            throw new Error(
                "Email already registered"
            );
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const userId =
            await User.create(
                name,
                email,
                hashedPassword
            );

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            userId
        });

    } catch (error) {
        next(error);
    }
};


exports.login = async (req, res, next) => {

    try {

        const {
            email,
            password
        } = req.body;

        const user =
            await User.findByEmail(email);

        if (!user) {
            throw new Error(
                "Invalid email or password"
            );
        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {
            throw new Error(
                "Invalid email or password"
            );
        }

        const token =
            jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );

        res.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        next(error);
    }
};