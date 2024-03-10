import { NextFunction, Request, Response } from "express";
import {CatchAsyncError} from "../middleware/catchAsyncErrors"
import OrderModel from "../models/OrderModel";
//create new order
export const newOrder = CatchAsyncError(async(data:any, res:Response) => {
    const order = await OrderModel.create(data);
    res.status(201).json({
        success: true,
        order:order
    })
})