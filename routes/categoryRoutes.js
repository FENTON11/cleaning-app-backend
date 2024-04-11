import express from 'express';
import { createCategory, deleteCategory, getAllCategory, updateCategory } from '../controllers/CategoryController.js';
import authorize from '../middlewares/authentication.js'

const Router = express.Router();
Router.route('/').post(createCategory).get(getAllCategory);
Router.route('/:id').patch(authorize,updateCategory).delete(authorize,deleteCategory)

export default Router;
