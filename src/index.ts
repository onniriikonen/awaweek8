import {Request, Response, Router} from "express"
import { Offer } from "./models/Offer"

const router: Router = Router()

router.post("/upload", async (req: Request, res: Response) => {
    try {
        const { title, description, price } = req.body;

        const newOffer = new Offer({
            title,
            description,
            price: Number(price)
        });

        await newOffer.save();
        res.status(201).json({ message: "Offer saved!" });
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ error: "Error" });
    }
});


export default router