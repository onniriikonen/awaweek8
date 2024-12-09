import { Request, Response, Router } from "express"
import { Offer } from "./models/Offer"
import { Image } from "./models/Image"
import upload from "./middleware/multer-config"

const router: Router = Router()

router.post("/upload", upload.single("image"), async (req: Request, res: Response) => {
    try {
        const { title, description, price } = req.body

        let imageId = null

        if (req.file) {
            const imgPath: string = req.file.path.replace("public", "")

            const image = new Image({
                filename: req.file.filename,
                path: imgPath
            })

            const savedImage = await image.save()
            imageId = savedImage._id
            console.log("File uploaded and saved")
        }

        const newOffer = new Offer({
            title,
            description,
            price: Number(price),
            imageId
        })

        await newOffer.save()

        res.status(201).json({ message: "Offer saved" })
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({ error: "Error" })
    }
})

export default router;
