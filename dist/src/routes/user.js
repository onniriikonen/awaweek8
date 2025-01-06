"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
// import { validateToken } from '../middleware/validateToken'
const router = (0, express_1.Router)();
router.post("/register", (0, express_validator_1.body)("email").isEmail().normalizeEmail(), (0, express_validator_1.body)("password").isLength({ min: 5 }), async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const existingUser = await User_1.User.findOne({ email: req.body.email });
        console.log(existingUser);
        if (existingUser) {
            res.status(403).json({ email: "Email already in use" });
            return;
        }
        const salt = bcrypt_1.default.genSaltSync(10);
        const hash = bcrypt_1.default.hashSync(req.body.password, salt);
        await User_1.User.create({
            email: req.body.email,
            password: hash
        });
        res.status(200).json({ message: "User registered successfully" });
        return;
    }
    catch (error) {
        console.error(`Error during registration: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});
router.get('/list', async (req, res) => {
    try {
        const users = await User_1.User.find();
        res.json(users);
        return;
    }
    catch (error) {
        console.error(`Error fetching users: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }
});
exports.default = router;
