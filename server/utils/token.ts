import jwt, { Secret } from 'jsonwebtoken';
require('dotenv').config()

interface IActivationToken {
    token: string;
    activationCode: string;
  }
  
export const createActivationToken = (user: any): IActivationToken => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    //console.log(activationCode);

    // Calculate the expiration time for 5 minutes in the future

    const token = jwt.sign(
      {
        user,
        activationCode,
      },
      process.env.ACTIVATION_SECRET!,
      {
        expiresIn: "5m",
      }
    );
    return { token, activationCode };
  };