import { Request, Response, NextFunction } from "express";
import userModel from "../models/user.model";
import { IUser } from "../models/user.model";
import ErrorHandler from "../utils/Errorhandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import { createActivationToken } from "../utils/token";
import { nextTick } from "process";
import { accessTokenOptions, refreshTokenOptions, sendToken } from "../utils/jwt";
import { redis } from "../utils/redis";
import { getUserById } from "../services/user.service";
import cloudinary from 'cloudinary';
require("dotenv").config();

//register user
interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const registrationUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;
      const isEmailExist = await userModel.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler("Email already exists", 400));
      }

      const user: IRegistrationBody = {
        name,
        email,
        password,
      };

      const activationToken = createActivationToken(user);

      const activationCode = activationToken.activationCode;
      const data = { user: { name: user.name }, activationCode };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activation-mail.ejs"),
        data
      );

      try {
        await sendMail({
          email: user.email,
          subject: "Account Activation",
          template: "activation-mail.ejs",
          data,
        });

        res.status(200).json({
          success: true,
          message: `Please check your email: ${user.email} to activate your account!`,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//import jwt, { Secret } from 'jsonwebtoken';

//activate user
interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}

export const activateUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } =
        req.body as IActivationRequest;
      //console.log('here');

      const newUser: { user: IUser; activationCode: string } = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as string
      ) as { user: IUser; activationCode: string };
      //console.log('here now')

      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler("invalid activation code", 400));
      }

      const { name, email, password } = newUser.user;
      const existUser = await userModel.findOne({ email });

      if (existUser) {
        return next(new ErrorHandler("Email already exists", 400));
      }

      const user = await userModel.create({
        name,
        email,
        password,
      });
      res.status(201).json({
        success: true,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//login user
interface ILoginRequest {
  email: string;
  password: string;
}

export const loginUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ILoginRequest;

      if (!email || !password) {
        return next(new ErrorHandler("please enter email and password", 400));
      }

      const user = await userModel.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("invalid email or password", 400));
      }

      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
        return next(new ErrorHandler("Password does not match", 400));
      }

      sendToken(user, 200, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//logout user
export const logoutUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refresh_token", "", { maxAge: 1 });

      const userId = req.user?._id || '';

    

      redis.del(userId);
      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//update access token
export const updateAccessToken = CatchAsyncError(async(req:Request, res:Response, next:NextFunction) => {
  try{
    const refresh_token = req.cookies.refresh_token as string;
    const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN as string) as JwtPayload;

    const message = 'could not refresh token';

    if(!decoded){
      return next(new ErrorHandler(message, 400));
    }
    const session = await redis.get(decoded.id as string);
    if(!session){
      return next(new ErrorHandler(message, 400));
    }

    const user = JSON.parse(session);

    const accessToken = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN as string, {
      expiresIn: '5m'
    });

    const refreshToken = jwt.sign({id: user._id}, process.env.REFRESH_TOKEN as string, {
      expiresIn: '3d'
    });

    req.user = user;

    res.cookie('access_token', accessToken, accessTokenOptions);
    res.cookie('refresh_token', refreshToken, refreshTokenOptions);

    res.status(200).json({
      status: 'sucess',
      accessToken,
    });

  }catch(error: any){
    return next(new ErrorHandler(error.message, 500))
  }
})

//get user info
export const getUserInfo = CatchAsyncError(async(req:Request, res:Response, next:NextFunction) => {
  try{
    const userId = req.user?._id;
    getUserById(userId, res);


  }catch(error:any){
    return next(new ErrorHandler(error.message,500))
  }
});

interface ISocialAuthBody{
  name:string;
  email:string;
  avatar:string;
}

//social auth
export const socialAuth = CatchAsyncError(async(req:Request, res:Response, next:NextFunction) => {
  try{
    const  {email, name, avatar} = req.body as ISocialAuthBody;
    const user = await userModel.findOne({email});
    if(!user){
      const newUser = await userModel.create({email, name, avatar});
      sendToken(newUser, 200, res);
    } else {
      sendToken(user,200,res);
    }

  }catch(error:any){
    return next(new ErrorHandler(error.message, 500));
  }
});

//update user info
interface IUpdateUserInfo{
  name?:string;
  email?:string;
}

export const updateUserInfo = CatchAsyncError(async(req:Request, res:Response, next:NextFunction) => {
  try{
    const {email, name} = req.body as IUpdateUserInfo;
    const userId = req.user?._id;
    //console.log(req.user)
    const user = await userModel.findById(userId);

    if(email && user){
      const isEmailExist = await userModel.findOne({email});
      if(isEmailExist){
        return next(new ErrorHandler('Email already exists', 400))
      }
      user.email = email;
    
    }

    if(name && user){
      user.name = name;
    }

    await user?.save();

    await redis.set(userId,JSON.stringify(user));

    res.status(201).json({
      success:true,
      user,
    })

  }catch(error:any){
    return next(new ErrorHandler(error.message, 500));
  }

});

//uodate user password
interface IUpdatePassword{
  oldPassword:string;
  newPassword: string;
}

export const updatePassword = CatchAsyncError(async(req:Request, res:Response, next:NextFunction) => {
  try{
    const {oldPassword, newPassword} = req.body as IUpdatePassword;

    if(!oldPassword || !newPassword){
      return next(new ErrorHandler('please enter old and new password', 400));
    }

    const user = await userModel.findById(req.user?._id).select("+password");//this is done because rhe password is select false in the model

    if(user?.password === undefined){
      return next(new ErrorHandler('invalid user', 400));
    }
    const isPasswordMatch = await user?.comparePassword(oldPassword);

    if(!isPasswordMatch){
      return next(new ErrorHandler('invalid old password', 400));

    }

    user.password = newPassword;

    await user.save();

    await redis.set(req.user?._id, JSON.stringify(user));

    res.status(201).json({
      success: true,
      user,
    })
    



  }catch(error:any){
    return next(new ErrorHandler(error.message, 500));
  }
})

//update profile picture
interface IUpdateProfilePicture{
  avatar:string;
}
export const updateProfilePicture = CatchAsyncError(async(req:Request, res:Response, next:NextFunction) => {
  try{
    const {avatar} = req.body as IUpdateProfilePicture;

    const userId = req.user?._id;

    const user = await userModel.findById(userId);

    if(avatar && user){
      //if user has an avatar
      if(user?.avatar?.public_id){
        //first delete the old image
        await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);
        const myCloud =  await cloudinary.v2.uploader.upload(avatar,{
          folder: 'avatars',
          width: 150
        });
      } else {
        const myCloud =  await cloudinary.v2.uploader.upload(avatar,{
          folder: 'avatars',
          width: 150
        });
        user.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.url,
        }
  
      }
    }

    await user?.save()

    await redis.set(userId, JSON.stringify(user));

    res.status(200).json({
      success: true,
      user,
    })

  }catch(error:any){
    return next(new ErrorHandler(error.message, 500))
  }
})