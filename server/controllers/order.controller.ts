import {NextFunction, Request, Response} from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/Errorhandler";
import OrderModel, {IOrder} from "../models/OrderModel";
import userModel from "../models/user.model";
import courseModel from "../models/course.model";
import path from "path"
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotoficationModel from "../models/notificationModel";
import { newOrder } from "../services/order.service";

export const createOrder = CatchAsyncError(async(req:Request, res:Response, next:NextFunction) => {
    try{
        const {courseId, payment_info} = req.body as IOrder;
        
        const user = await userModel.findById(req.user?._id);

        const courseExistInUser = user?.courses.some((course:any) => course._id.toString() === courseId);
        if(courseExistInUser){
            return next (new ErrorHandler('You already purchased this course', 400));
        }

        const course = await courseModel.findById(courseId);

        if(!course){
            return next (new ErrorHandler('course not found', 404));
        }

        const data:any = {
            courseId:course._id,
            userId: user?._id,
        }

        newOrder(data, res, next);

        const mailData = {
            order:{
                _id:course._id.slice(0,6),
                name:course.name,
                price:course.price,
                date:new Date().toLocaleDateString('en-US',{year:'numeric', month:'long', day:'numeric'}),
            }
        }

        const html = await ejs.renderFile(path.join(__dirname, '../mails/order-confirmation.ejs'), mailData);



    }catch(error:any){
        return next(new ErrorHandler(error.message, 500))
    }
})
