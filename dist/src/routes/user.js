"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { validateToken } from '../middleware/validateToken'
const router = (0, express_1.Router)();
const userList = [];
router.post("/register", (0, express_validator_1.body)("email").isEmail().normalizeEmail(), (0, express_validator_1.body)("password").isLength({ min: 3 }), async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const existingUser = userList.find(user => user.email === req.body.email);
        if (existingUser) {
            res.status(403).json({ email: "Email already in use" });
            return;
        }
        const salt = bcrypt_1.default.genSaltSync(10);
        const hash = bcrypt_1.default.hashSync(req.body.password, salt);
        const user = {
            email: req.body.email,
            password: hash
        };
        userList.push(user);
        res.status(200).json({
            email: user.email,
            password: user.password,
        });
        return;
    }
    catch (error) {
        console.error(`Error during registration: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});
router.post("/login", (0, express_validator_1.body)("email").isEmail().normalizeEmail(), (0, express_validator_1.body)("password").exists(), async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = userList.find(user => user.email === email);
        if (!user) {
            res.status(401).json({ message: "Login failed" });
            return;
        }
        const valid = bcrypt_1.default.compareSync(password, user.password);
        if (!valid) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        const jwtPayload = {
            email: user.email,
        };
        const token = jsonwebtoken_1.default.sign(jwtPayload, process.env.SECRET, { expiresIn: "2m" });
        res.status(200).json({ success: true, token });
        return;
    }
    catch (error) {
        console.error(`Error during user login: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }
});
router.get('/list', async (req, res) => {
    try {
        const formattedUsers = userList.map(user => ({
            email: user.email,
            password: user.password,
        }));
        res.json(formattedUsers);
        return;
    }
    catch (error) {
        console.error(`Error fetching users: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }
});
exports.default = router;
