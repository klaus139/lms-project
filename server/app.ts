import express, { Request, Response, NextFunction } from 'express';
require('dotenv').config();
import { ErrorMiddleWare } from './middleware/Error';
import userRouter from './routes/user.route';
import courseRouter from './routes/course.route';
import orderRouter from "./routes/order.route";
import notificationRoute from './routes/notification.route';
import analyticsRouter from './routes/analytics.route';
import layoutRouter from './routes/layout.route';
export const app = express();

import cors from 'cors';
import cookieParser from 'cookie-parser';

//body-paser
app.use(express.json({limit: '50mb'}));

//cookier-parser
app.use(cookieParser());

//cors cross origin resource sharing
// app.use(cors({
//     origin: ['http://localhost:3000'],
//     credentials:true,
    
// }));

app.use(cors({
    origin: ['http://localhost:3001'],
    credentials: true,
  }));
  



//routes
app.use('/api/v1', userRouter);
app.use('/api/v1', courseRouter);
app.use('/api/v1', orderRouter);
app.use('/api/v1', notificationRoute);
app.use('/api/v1', analyticsRouter)
app.use('/api/v1', layoutRouter);



//testing api
app.get('/test', (req:Request, res:Response, next:NextFunction)=> {
    res.status(200).json({
        success: true,
        message: 'API is working'
    })
})

app.all('*', (req:Request, res:Response, next:NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 400;
    next(err);
})
app.use(ErrorMiddleWare);

