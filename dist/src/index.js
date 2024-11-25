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
router.get("/todos/:id", (req, res) => {
    let { id } = req.params;
    const user = users.find((u) => u.name === id);
    if (!user) {
        res.status(404).send("User not found");
    }
    else {
        res.json(user.todos);
    }
});
router.delete("/delete", (req, res) => {
    const { name } = req.body;
    const index = users.findIndex((u) => u.name === name);
    users.splice(index, 1);
    fs_1.default.writeFile("data/users.json", JSON.stringify(users), (err) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send("User deleted successfully.");
    });
});
router.put("/update", (req, res) => {
    const { name, todo } = req.body;
    const user = users.find((u) => u.name === name);
    if (!user) {
        return;
    }
    const index = user.todos.indexOf(todo);
    user.todos.splice(index, 1);
    fs_1.default.writeFile("data/users.json", JSON.stringify(users), (err) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send("Todo deleted successfully.");
    });
});
exports.default = router;
