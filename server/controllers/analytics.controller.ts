import {Request, Response, NextFunction} from "express";
import ErrorHandler from "../utils/Errorhandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import { generateLast12MonthsData } from "../utils/analytics.generator";
import userModel from "../models/user.model";
import courseModel from "../models/course.model";
import OrderModel from "../models/OrderModel";

//user data analytics
export const getUserAnalytics = CatchAsyncError(async(req:Request, res:Response, next:NextFunction) => {
    try{
        const users = await generateLast12MonthsData(userModel);

        res.status(200).json({
            success:true,
            users,
        })

    }catch(error:any){
        return next(new ErrorHandler(error.message, 500))
    }
})

//course analytics

export const getCourseAnalytics = CatchAsyncError(async(req:Request, res:Response, next:NextFunction) => {
    try{
        const courses = await generateLast12MonthsData(courseModel);

        res.status(200).json({
            success:true,
            courses,
        })

    }catch(error:any){
        return next(new ErrorHandler(error.message, 500))
    }
})

//order analytics
export const getOrderAnalytics = CatchAsyncError(async(req:Request, res:Response, next:NextFunction) => {
    try{
        const orders = await generateLast12MonthsData(OrderModel);

        res.status(200).json({
            success:true,
            orders,
        })

    }catch(error:any){
        return next(new ErrorHandler(error.message, 500))
    }
})