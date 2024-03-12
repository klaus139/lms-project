import { Response } from "express";
import courseModel from "../models/course.model";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";

//create Course
export const createCourse = CatchAsyncError(async(data:any, res:Response) => {
    const course = await courseModel.create(data);
    res.status(201).json({
        success: true,
        course
    })
})

export const getAllCourseService = async(res:Response) => {
    const users = await courseModel.find().sort({createdAt: -1});
    res.status(200).json({
        success:true,
        users
    })
}