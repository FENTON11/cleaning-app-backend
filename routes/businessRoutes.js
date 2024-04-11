import express from 'express';
import { createBussiness, deleteBusiness,search, getAllBusinesses, getCategoryBusinesses, getSingleBusiness, updateBusiness } from '../controllers/BusinessController.js';
const Router = express.Router();
import authorize from '../middlewares/authentication.js'
Router.route('/').post(authorize,createBussiness).get(getAllBusinesses);
Router.route('/search').get(search);
Router.route('/category/:category').get(getCategoryBusinesses)
Router.route('/:id').get(authorize,getSingleBusiness).patch(authorize,updateBusiness).delete(authorize,deleteBusiness)

export default Router;
