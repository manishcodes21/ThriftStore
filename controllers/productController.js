import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import slugify from "slugify";
//fs is file system
import fs from "fs";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

//payment gateway

const gateway = new braintree.BraintreeGateway({  
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});



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


// filters
export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

// product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 2;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      //we are not fetching photo here because we are fetching it separately using other api call
      //for overall boost of application
      .select("-photo")
      //skip is used to skip the number of documents of before pages for pagination
      .skip((page - 1) * perPage)
      .limit(perPage)
      //-1 represents descending order, while 1 represents ascending order.
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};


// search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        // $or is used to search in multiple fields
        $or: [
          // options i is used to make it case insensitive
          //regex is used to search in partial string
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};


// similar products
export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// get prdocyst by catgory
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};


//token controller
export const braintreeTokenController = async(req, res) => {
  try {
      gateway.clientToken.generate({}, (err, response) => {
        if (err) {
          return res.status(500).send({
            success: false,
            message: "Error in generating token",
            error: err,
          });
        }
        res.send({
          success: true,
          token: response.clientToken,
        });
      });
  } catch (error) {
    console.log(error);
  }

};

//payment controller
export const braintreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((p) => {
      total += p.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,  
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          console.log(result);
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};