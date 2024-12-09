import mongoose, { Document, Schema } from "mongoose";

interface IOffer extends Document {
    title: string
    description: string
    price: number
    imageId?: string
}

let offerSchema: Schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    imageId: { type: mongoose.Schema.Types.ObjectId, ref: "Image" }

})

const Offer: mongoose.Model<IOffer> = mongoose.model<IOffer>("Offer", offerSchema)

export { IOffer, Offer }