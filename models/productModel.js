import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    //linking the product to categories using mongoose inbuilt functions
    //ref should be the name which we gave to category model
    type: mongoose.ObjectId,
    ref: "Category",
    require:true
  },
  quantity:{
    type:Number,
    required:true
  },
  photo:{
    data:Buffer,
    contentType:String
  },
  shipping:{
    type:Boolean
  }

},{timestamps:true});

export default mongoose.model('Products',productSchema);