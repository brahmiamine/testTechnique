import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
require("dotenv").config();

export interface AuthRequest extends Request {
    user?: any;
}

/**
 * The function `verifyJwt` is used to verify a JSON Web Token (JWT), and it adds the decoded payload to the request object
 * if the token is valid.
 * @param {AuthRequest} req - The `req` parameter is the request object that contains information about the incoming HTTP request
 * @param {Response} res - The `res` parameter is the response object
 * @param {NextFunction} next - This  used to pass control to the next middleware function in the request-response
 * @returns In this code snippet, if there is no token provided in the request header, a response with status code 401 and a JSON object containing the
 * message "Access denied. No token provided." will be returned.
 */
export const verifyJwt = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split('Bearer ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
