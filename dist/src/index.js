"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
let users = [];
fs_1.default.readFile("data/users.json", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    try {
        users = JSON.parse(data);
    }
    catch (error) {
        console.error("Error");
    }
});
router.get("/", (req, res) => {
    res.json(users);
});
router.post("/add", (req, res) => {
    const { name, todo } = req.body;
    let user = users.find((u) => u.name === name);
    if (!user) {
        user = { name, todos: [] };
        users.push(user);
    }
    user.todos.push(todo);
    fs_1.default.writeFile("data/users.json", JSON.stringify(users), (err) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send(`Todo added successfully for user ${name}.`);
    });
});
exports.default = router;
