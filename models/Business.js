import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required:[true,'please provide the business name'],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required:[true,'please provide the business owner'],
            ref:'users'

        },
        address: {
            type: String,
            default:'',
        },
        about: {
            type: String,
            default:'',
        },
        images: {
            required:[true,'please provide the business image'],
            type: [ {
                type: String,
            },]
           
        },
        category:{
            type: String,
            required:[true,'please provide the business category'],
        }
    },
    { timestamps: true }
);

export default mongoose.model('businesses', businessSchema);
