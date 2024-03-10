import { NextFunction, Request, Response } from "express";
import {CatchAsyncError} from "../middleware/catchAsyncErrors"
import OrderModel from "../models/OrderModel";
//create new order
export const newOrder = CatchAsyncError(async(data:any, next:NextFunction) => {
    const order = await OrderModel.create(data);
    next(order);
})