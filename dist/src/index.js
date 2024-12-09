"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Offer_1 = require("./models/Offer");
const router = (0, express_1.Router)();
router.post("/upload", async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const newOffer = new Offer_1.Offer({
            title,
            description,
            price: Number(price)
        });
        await newOffer.save();
        res.status(201).json({ message: "Offer saved!" });
    }
    catch (error) {
        console.error("Error", error);
        res.status(500).json({ error: "Error" });
    }
});
exports.default = router;
