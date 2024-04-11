import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
    {
        name: {
            type:String,
            ref:'users',
            required:[true,'please provide category name']
        },
        icon: {
            type: String,
            required:[true,'please provide icon']
        }
    },
    { timestamps: true }
);

export default mongoose.model('categories', categorySchema);
