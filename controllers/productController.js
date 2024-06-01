import productModel from "../models/productModel.js";
import slugify from "slugify";
//fs is file system
import fs from "fs";

export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(400).send({
          success: false,
          message: "Product name is missing",
        });
      case !description:
        return res.status(400).send({
          success: false,
          message: "Product description is missing",
        });
      case !price:
        return res.status(400).send({
          success: false,
          message: "Product price is missing",
        });
      case !category:
        return res.status(400).send({
          success: false,
          message: "Product category is missing",
        });
      case !quantity:
        return res.status(400).send({
          success: false,
          message: "Product quantity is missing",
        });
      case !photo || photo.size > 1000000:
        return res.status(400).send({
          success: false,
          message: "Product photo is required and should be,less then 1mb",
        });
    }

    const existingProduct = await productModel.findOne({ name });
    if (existingProduct) {
      return res.status(200).send({
        success: true,
        message: "Product already exists",
      });
    }

    const product = new productModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();

    res.status(201).send({
      success: true,
      message: "Product has been created succesfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating product",
      error,
    });
  }
};

//get all products
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      total_count: products.length,
      message: "Product fetched succedfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in server getting all products ",
      error: error,
    });
  }
};

//get single product from

export const getSingleProductController = async (req, res) => {
  try {
    console.log("hello");
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product fetched succedfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting single product",
      error,
    });
  }
};

//get photo of the product
//we are fetching separetely for overall boost of application

  export const getProductPhotoController = async (req, res) => {
    try {
      const product = await productModel.findById(req.params.pid).select("photo");
      if (!product || !product.photo || !product.photo.data) {
        return res.status(404).send({
          success: false,
          message: "Product photo not found",
        });
      }
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in getting product photo",
        error,
      });
    }
  };

//delete product
export const deleteProductController =async(req,res)=>{
  try {
    await productModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "Product deleted successfully"
    })
  } catch (error) {
     console.log(error);
     res.status(500).send({
       success: false,
       message: "Error in deleting product ",
       error,
     });
  }
}

//update product
export const updateProductController=async(req,res)=>{
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(400).send({
          success: false,
          message: "Product name is missing",
        });
      case !description:
        return res.status(400).send({
          success: false,
          message: "Product description is missing",
        });
      case !price:
        return res.status(400).send({
          success: false,
          message: "Product price is missing",
        });
      case !category:
        return res.status(400).send({
          success: false,
          message: "Product category is missing",
        });
      case !quantity:
        return res.status(400).send({
          success: false,
          message: "Product quantity is missing",
        });
      case photo && photo.size > 1000000:
        return res.status(400).send({
          success: false,
          message: "Product photo should be,less then 1mb",
        });
    }

    const product =await productModel.findByIdAndUpdate(req.params.pid,{
      ...req.fields,
      slug:slugify(name)
    },
    {
      new:true
    })
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();

    res.status(201).send({
      success: true,
      message: "Product has been updated succesfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating product",
      error,
    });
  }
}
