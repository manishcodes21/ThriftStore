import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryController.js";
const router = express.Router();

//routes
//createcategory
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//updatecategory
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

//get all category
//no need of any middleware bcuz a person can see all categories even though he is not logged in
router.get('/get-category',categoryController);

//get single category
router.get('/single-category/:slug',singleCategoryController);
export default router;

//delete category 
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController);
