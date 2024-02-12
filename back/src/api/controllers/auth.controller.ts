import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service'
import jwt from 'jsonwebtoken'
import { sanitizeUser } from '../../utils/sanitizeUser';
require("dotenv").config();

export class AuthController {

    /**
     * This handles the registration of a user, sanitizes the user data, generates a JWT token, and returns it in the response.
     * @param {Request} req - The `req` parameter is an object representing the HTTP request
     * @param {Response} res - The `res` parameter is an object representing the HTTP response 
     * @returns a JSON response with a status code of 201 (Created) and a token in the response body.
     */
    public static async register(req: Request, res: Response): Promise<Response> {
        try {
            const user = await AuthService.register(req.body);
            const sanitizedUser = sanitizeUser(user);
            const token = jwt.sign(
                { user: sanitizedUser },
                process.env.SECRET_KEY as string,
                { expiresIn: '3d' }
            );

            return res.status(201).json({ token });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }

            return res.status(500).json({ error: "An unexpected error occurred" });
        }
    }

    /**
     * The login function handles user authentication, generates a JWT token, and returns it in the response.
     * @param {Request} req - The `req` parameter is an object representing the HTTP request 
     * @param {Response} res - The `res` parameter is the response object
     * @returns a JSON response with a status code of 200 and a token in the body.
     */
    public static async login(req: Request, res: Response): Promise<Response> {
        try {
            const user = await AuthService.login(req.body);
            const sanitizedUser = sanitizeUser(user);
            const token = jwt.sign(
                { user: sanitizedUser },
                process.env.SECRET_KEY as string,
                { expiresIn: '3d' }
            );
            return res.status(200).json({ token });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }

            return res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
}
