import Category from '../models/Category.js';
import Users from '../models/User.js';
// import Bookings from '../models/Order.js';
import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/not-found.js';
import BadRequestError from '../errors/bad-request.js';

export const createCategory = async (req, res, next) => {
    try {
         const category = await Category.create({...req.body});
        return res.status(StatusCodes.OK).json({ success: true, category });
    } catch (error) {
        next(error);
    }
};
export const getAllCategory = async (req, res, next) => {
    try {
        const categories = await Category.find({});
        return res.status(StatusCodes.OK).json({ success: true, categories });
    } catch (error) {
        next(error);
    }
};


export const updateCategory = async (req, res, next) => {
    try {
        const {params:{id},user:{userID}} = req;
        let category = await Category.findById(id);
        let user = await Users.findById(userID);
        if(!category){
            return new NotFoundError('no category with the provided id')
        }
        console.log("checking ownership");
        // if(category.user !== user._id || user.role !== 'admin' ){
        //     return new BadRequestError('OPERATION DENIED!!!!')
        // }
        console.log("updating");
        category = await Category.findByIdAndUpdate(id,{...req.body},{new:true,runValidators:true});
        return res.status(StatusCodes.OK).json({ success: true, category });
    } catch (error) {
        next(error);
    }
};
export const deleteCategory = async (req, res, next) => {
    try {
        const {params:{id},user:{userID}} = req;
        const category = await Category.findById(id);
          let user = await Users.findById(userID);
          if(!category){
            return  new NotFoundError('no category with the provided id')
        }
        // if(category.user !== user._id || user.role !== 'admin' ){
        //     return new BadRequestError('OPERATION DENIED!!!!')
        // }
         await Category.findByIdAndDelete(id);
        return res.status(StatusCodes.OK).json({ success: true,messege:'category deleted deleted' });
    } catch (error) {
        next(error);
    }

}