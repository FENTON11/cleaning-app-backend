//imports
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import notFound from './middlewares/notFound.js';
import connectDB from './db/connect.js';
import errorHandlerMiddleware from './middlewares/error-handler.js';
import userRouter from "./routes/userRoutes.js"
import businessRouter from "./routes/businessRoutes.js"
import categoryRouter from "./routes/categoryRoutes.js"
import bookingRouter from "./routes/bookingRoutes.js"
import { login, register } from './controllers/usersController.js';
import { getIpAddress } from './lib/Ip address.js';
//app config
dotenv.config();
const app = express();

//extra security packages
app.use(cors({origin:"*"}));
app.use(helmet());

//middlewares
app.use(express.json({ limit: 10000000000 }));
// app.use(express);

//api  routes
app.get('/api/v1/home-service', (req, res) => {
    const ipAddress = getIpAddress();
    console.log('IP Address:', ipAddress); 
    res.status(200).json({
        success: true,
        message: 'my home service app!!!',
    });
});
app.use('/api/v1/home-service/users', userRouter);
app.use('/api/v1/home-service/booking', bookingRouter);
app.use('/api/v1/home-service/business', businessRouter);
app.use('/api/v1/home-service/categories', categoryRouter);


//not found route
app.use(notFound);

//error handlermindleware
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;
const start = async () => {
    
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`server listening at port ${port}...`));
};

start();
