import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/Errorhandler";
import cloudinary from "cloudinary";
import { createCourse } from "../services/course.service";
import courseModel from "../models/course.model";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import ejs from "ejs";
import path from "path";

//upload course
export const uploadCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      createCourse(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
//edit course
export const editCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        await cloudinary.v2.uploader.destroy(thumbnail.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });
        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      const courseId = req.params.id;

      const course = await courseModel.findByIdAndUpdate(
        courseId,
        {
          $set: data,
        },
        { new: true }
      );

      res.status(201).json({
        sucess: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get single course --without purchasing
export const getSingleCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;

      const isCacheExist = await redis.get(courseId);
      //
      if (isCacheExist) {
        const course = JSON.parse(isCacheExist);
        res.status(200).json({
          success: true,
          course,
        });
      } else {
        const course = await courseModel
          .findById(req.params.id)
          .select(
            "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
          );
        //console.log('hittig mongo')

        await redis.set(courseId, JSON.stringify(course));
        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const getAllCourses = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isCacheExist = await redis.get("allCourses");
      if (isCacheExist) {
        const courses = JSON.parse(isCacheExist);
        //console.log('hittinh redis')
        res.status(200).json({
          success: true,
          courses,
        });
      } else {
        const courses = await courseModel
          .find()
          .select(
            "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
          );
        //console.log('hitting mongodb');
        await redis.set("allCourses", JSON.stringify(courses));
        res.status(200).json({
          success: true,
          courses,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get course content only for valid users

export const getCourseByUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = await req.user?.courses;
      const courseId = req.params.id;

      const courseExists = userCourseList?.find(
        (course: any) => course._id.toString() === courseId
      );

      if (!courseExists) {
        return next(
          new ErrorHandler("You are not eligible to access this course", 400)
        );
      }

      const course = await courseModel.findById(courseId);

      const content = course?.courseData;

      res.status(200).json({
        success: true,
        content,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//add question
interface IAddQUestionData{
    question:string;
    courseId:string;
    contentId: string;
}

export const addQuestion = CatchAsyncError(async(req:Request, res:Response, next:NextFunction) => {
    try{
        const {question, courseId, contentId}:IAddQUestionData = req.body;
        const course = await courseModel.findById(courseId);

        if(!mongoose.Types.ObjectId.isValid(contentId)){
            return next(new ErrorHandler('invalid content id', 400))
        }

        const courseContent = course?.courseData?.find((item:any) => item._id.equals(contentId));

        if(!courseContent){
            return next(new ErrorHandler('invalid content id', 400));
        }

        const newQuestion:any = {
            user:req.user,
            question,
            questionReplies:[],
        }

        //add this question to our course content
        courseContent.questions.push(newQuestion);

        //save the updatd course
        await course?.save();
        res.status(200).json({
            success: true,
            course
        })


    }catch(error:any){
        return next(new ErrorHandler(error.message, 500))
    }
})

//add answer to questions
interface IAddAnswerData{
    answer:string;
    courseId:string;
    contentId:string;
    questionId: string;
}

export const addAnswer = CatchAsyncError(async(req:Request, res:Response, next:NextFunction) => {
    try{
        const {answer, courseId, contentId, questionId}:IAddAnswerData = req.body;

        const course = await courseModel.findById(courseId);

        if(!mongoose.Types.ObjectId.isValid(contentId)){
            return next(new ErrorHandler('invalid content id', 400))
        }

        const courseContent = course?.courseData?.find((item:any) => item._id.equals(contentId));

        if(!courseContent){
            return next(new ErrorHandler('invalid content id', 400));
        }

        const question = courseContent?.questions?.find((item:any) => item._id.equals(questionId));

        if(!question){
            return next(new ErrorHandler('invalid question id', 400));

        }

        //create new answer object
        const newAnswer:any = {
            user:req.user,
            answer,
        }

        question.questionReplies?.push(newAnswer);

        await course?.save();

        if(req.user?._id === question.user?._id){
            //create a notification to admin dashboard

        }else{
            const data = {
                name:question.user.name,
                title:courseContent.title,

            }
            const html = await ejs.renderFile(path.join(__dirname, "../mail/question-reply.ejs"), data);
        }


    }catch(error:any){
        return next(new ErrorHandler(error.message, 500))
    }
})

