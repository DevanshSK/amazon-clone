import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const productSchema = new Schema({
    category: {
        ref: "Category",
        required: true,
        type: Schema.Types.ObjectId,
    },
    description: {
        required: true,
        type: String,
    },
    mainImage: {
        required: true,
        type: {
            url: String,
            localPath: String,
        },
    },
    name: {
        required: true,
        type: String,
    },
    seller: {
        required: true,
        type: String,
    },
    brand: {
        required: true,
        type: String,
    },
    price: {
        type: Number,
        default: 0,
    },
},
{
    timestamps: true,
});

productSchema.plugin(mongooseAggregatePaginate);

export const Product = mongoose.model("Product", productSchema);