import NotificationModel from "../models/notificationModel";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/Errorhandler";
import express, { NextFunction, Request, Response } from "express";
import cron from "node-cron";
import NotoficationModel from "../models/notificationModel";

//get all notifications - only for admin
export const getAllNotifications = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications = await NotificationModel.find().sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//update notification status --admmin

export const updateNotificationStatus = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await NotificationModel.findById(req.params.id);
      if (!notification) {
        return next(new ErrorHandler("Notification not found", 404));
      } else {
        notification.status
          ? (notification.status = "read")
          : notification?.status;
      }
      await notification.save();

      const notifications = await NotificationModel.find().sort({
        createdAt: -1,
      });

      res.status(201).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//delete notification on the admin
cron.schedule("0 0 0 * * *", async()=>{
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await NotoficationModel.deleteMany({status:"read", createdAt:{$lt: thirtyDaysAgo}}); //delete notification every midnight but ojly those that are read 30 days go
    console.log("Cleaning up old notifications...");
})
