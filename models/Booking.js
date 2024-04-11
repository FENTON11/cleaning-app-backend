import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'users',
            required:[true,'please provide user who booked']
        },
        business: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'businesses',
            required:[true,'please provide business id who booked']
        },
        date: {
            type: String,
            required:[true,'please provide booking date']
        },
        time: {
            type: String,
        },
        status: {
            type: String,
            enum:['completed','pending','cancelled'],
            default:'pending'
        },
        comment: {
            type: String,
        },
    },
    { timestamps: true }
);

export default mongoose.model('bookings', bookingSchema);
