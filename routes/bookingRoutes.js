import express from 'express';
import { createBooking, getUserBooking,deleteBooking } from '../controllers/BookingControlller.js';
import  authorize from "../middlewares/authentication.js"
const Router = express.Router();
Router.route('/').post(authorize,createBooking).get(authorize,getUserBooking);
Router.route('/delete/:id').delete(deleteBooking)

export default Router;
