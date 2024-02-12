import { Request, Response } from 'express';
import { UserService } from '../services/user.service'
import { sanitizeUser } from '../../utils/sanitizeUser';
import bcrypt from 'bcrypt'

export class UserController {

    /**
     * The function retrieves all users, sanitizes their data, and returns a JSON response.
     * @param {Request} req - The `req` parameter is an object representing the HTTP request 
     * @param {Response} res - The `res` parameter is the response object
     * @returns a Promise that resolves to a Response object.
     */
    public static async getAllUsers(req: Request, res: Response): Promise<Response> {
        try {
            const users = await UserService.getAllUsers();

            const sanitizedUsers = users.map(user => sanitizeUser(user));

            return res.status(200).json(sanitizedUsers);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }

            return res.status(500).json({ error: "An unexpected error occurred" });
        }
    }


    /**
     * The function `getUserByEmail` retrieves a user by their email address, sanitizes the user data, and returns it in a JSON response.
     * @param {Request} req - The `req` parameter is an object that represents the HTTP request 
     * @param {Response} res - The `res` parameter is the response object 
     * @returns a Promise that resolves to a Response object.
     */
    public static async getUserByEmail(req: Request, res: Response): Promise<Response> {
        try {
            const user = await UserService.getUserByEmail(req.params.email);

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const sanitizedUser = sanitizeUser(user);

            return res.status(200).json(sanitizedUser);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(500).json({ error: "An unexpected error occurred" });
        }
    }


    /**
     * This function deletes a user by their ID and returns a success message if the user is found and deleted, or an error message if the user is not found
     * or an unexpected error occurs.
     * @param {Request} req - The `req` parameter is an object that represents the HTTP request
     * @param {Response} res - The `res` parameter is the response object
     * @returns a Promise that resolves to a Response object.
     */
    public static async deleteUserById(req: Request, res: Response): Promise<Response> {
        try {
            const user = await UserService.deleteUserById(req.params.id);
            if (user) {
                return res.status(200).json({ message: "User is deleted" });
            }

            return res.status(404).json({ message: "User not found" });

        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }

            return res.status(500).json({ error: "An unexpected error occurred" });
        }
    }


    /**
     * The function updates a user by their ID, hashing the password if provided, and returns the updated user.
     * @param {Request} req - The `req` parameter is an object that represents the HTTP request
     * @param {Response} res - The `res` parameter is the response object
     * @returns a Promise that resolves to a Response object.
     */
    public static async updateUserById(req: Request, res: Response): Promise<Response> {
        try {

            const userId = req.params.id;

            if (!userId) {
                return res.status(400).json({ error: "User ID is required in the request parameter" });
            }

            const updateData = req.body
            if (!updateData) {
                return res.status(400).json({ error: "Update data is required in the request body" });
            }

            let updatedUser = null;

            if (updateData.password) {
                const { password } = updateData;
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = { ...updateData, password: hashedPassword };
                updatedUser = await UserService.updateUserById(userId, newUser);
            } else {
                updatedUser = await UserService.updateUserById(userId, updateData);
            }

            if (!updatedUser) {
                return res.status(404).json({ error: "User not found or update failed" });
            }

            const user = sanitizeUser(updatedUser);

            return res.status(200).json(user);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
}
