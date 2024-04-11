import Business from '../models/Business.js';
import Users from '../models/User.js';
// import Bookings from '../models/Order.js';
import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/not-found.js';
import BadRequestError from '../errors/bad-request.js';

export const createBussiness = async (req, res, next) => {
    const {user:{userID}} = req;
    try {
         const business = await Business.create({...req.body,user:userID});
        return res.status(StatusCodes.OK).json({ success: true, business });
    } catch (error) {
        next(error);
    }
};
export const getCategoryBusinesses = async (req, res, next) => {
    const {params:{category}} = req
    console.log(category)
    try {
        const businesses = await Business.find({category}).populate({path:"user", select:"email name"});
        return res.status(StatusCodes.OK).json({ success: true, businesses });
    } catch (error) {
        next(error);
    }
};
export const getAllBusinesses = async (req, res, next) => {
    try {
        const businesses = await Business.find({}).populate({path:"user", select:"email name"});
        return res.status(StatusCodes.OK).json({ success: true, businesses });
    } catch (error) {
        next(error);
    }
};
export const search = async (req, res, next) => {
    try {
        const {query:{searchTerm}} = req
        let businesses = await Business.find({ $or: [
        {  category: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search for title
        { name: { $regex: searchTerm, $options: 'i' } } // Case-insensitive search for description
      ]}).populate({path:"user", select:"email name"});
      if(businesses.length === 0){
        business = await Business.find({}).populate({path:"user", select:"email name"});
      }
      return res.status(StatusCodes.OK).json({ success: true, businesses });
    } catch (error) {
        next(error);
    }
};
export const getSingleBusiness = async (req, res, next) => {
    try {
        const {params:{id}} = req;
        const business = await Business.findById(id);
        return res.status(StatusCodes.OK).json({ success: true, business });
    } catch (error) {
        next(error);
    }
};
export const updateBusiness = async (req, res, next) => {
    try {
        const {params:{id},user:{userID}} = req;
        let business = await Business.findById(id);
        let user = await Users.findById(userID);
        if(!business){
            return new NotFoundError('no business with the provided id')
        }
        console.log("checking ownership");
        // if(business.user !== user._id || user.role !== 'admin' ){
        //     return new BadRequestError('OPERATION DENIED!!!!')
        // }
        console.log("updating");
        business = await Business.findByIdAndUpdate(id,{...req.body},{new:true,runValidators:true});
        return res.status(StatusCodes.OK).json({ success: true, business });
    } catch (error) {
        next(error);
    }
};
export const deleteBusiness = async (req, res, next) => {
    try {
        const {params:{id},user:{userID}} = req;
        const business = await Business.findById(id);
          let user = await Users.findById(userID);
          if(!business){
            return  new NotFoundError('no business with the provided id')
        }
        // if(business.user !== user._id || user.role !== 'admin' ){
        //     return new BadRequestError('OPERATION DENIED!!!!')
        // }
         await Business.findByIdAndDelete(id);
        return res.status(StatusCodes.OK).json({ success: true,messege:'business deleted deleted' });
    } catch (error) {
        next(error);
    }
}