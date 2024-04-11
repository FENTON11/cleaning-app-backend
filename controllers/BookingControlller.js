import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/not-found.js';
import BadRequestError from '../errors/bad-request.js';
import Booking from '../models/Booking.js';

export const createBooking = async (req, res, next) => {
    try {
        const {user:{userID:user}} = req;
         const booking = await Booking.create({...req.body,user});
         return res.status(StatusCodes.CREATED).json({ success: true, booking });
    } catch (error) {
        next(error);
    }
};
export const getUserBooking = async (req, res, next) => {
    try {
        const {user:{userID:user}} = req;
         const bookings = await Booking.find({user}).populate({path:'business',populate:{path:'user', select:'email'}});
         return res.status(StatusCodes.CREATED).json({ success: true, bookings });
    } catch (error) {
        next(error);
    }
};
export const deleteBooking = async (req, res, next) => {
    try {
        const {params:{id}} = req;
         await Booking.findByIdAndDelete(id);
         return res.status(StatusCodes.OK).json({ success: true, message:'booking deleted!!!' });
    } catch (error) {
        next(error);
    }
};