import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Process",
      //enum means 'only these values are allowed in this field
      enum: ["Not Process", "Processing", "Shipped", "delivered", "cancel"],
    },
  },
  //timestamps will save the time when the order is created
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
