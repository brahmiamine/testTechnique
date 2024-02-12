import { Request, Response } from 'express';
import { MessageService } from '../services/message.service'
import { UserService } from '../services/user.service';

export class MessageController {


    /**
     * The function saves a message by retrieving the user's name based on their email and then saves the message with the sender's name included.
     * @param {Request} req - The `req` parameter is an object that represents the HTTP request 
     * @param {Response} res - The `res` parameter is an instance of the `Response` object from the Express.js framework.
     * @returns a Promise that resolves to a Response object.
     */
    public static async saveMessage(req: Request, res: Response): Promise<Response> {
        try {
            const userEmail = req.body.from;
            if (!userEmail) {
                return res.status(400).json({ error: 'User email is required' });
            }

            const user = await UserService.getUserByEmail(userEmail);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const senderName = user.name;
            const message = await MessageService.saveMessage({ ...req.body, senderName: senderName });
            return res.status(201).json(message);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(500).json({ error: "An unexpected error occurred" });
        }
    }

    /**
     * The function getAllMessages retrieves all messages and returns them as a JSON response, handling any errors that may occur.
     * @param {Request} req - The `req` parameter is an object that represents the HTTP request
     * @param {Response} res - The `res` parameter is the response object
     * @returns a Promise<Response>.
     */
    public static async getAllMessages(req: Request, res: Response): Promise<Response> {
        try {
            const messages = await MessageService.getAllMessage();
            return res.status(200).json(messages);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }

            return res.status(500).json({ error: "An unexpected error occurred" });
        }
    }

    /**
     * The function retrieves a message by its ID and returns it as a JSON response, handling any errors that may occur.
     * @param {Request} req - The `req` parameter is an object that represents the HTTP request 
     * @param {Response} res - The `res` parameter is the response object
     * @returns a Promise that resolves to a Response object.
     */
    public static async getMessageById(req: Request, res: Response): Promise<Response> {
        try {
            const message = await MessageService.getMessageById(req.params.id);
            return res.status(200).json(message);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }

            return res.status(500).json({ error: "An unexpected error occurred" });
        }
    }


    /**
     * The function retrieves messages for a given email and returns them as a JSON response.
     * @param {Request} req - The `req` parameter is an object that represents the HTTP request 
     * @param {Response} res - The `res` parameter is the response object
     * @returns a Promise<Response>.
     */
    public static async getMyMessages(req: Request, res: Response): Promise<Response> {
        try {
            const email = req.params.email;

            if (!email) {
                return res.status(400).json({ error: 'Email is required in the request body.' });
            }

            const message = await MessageService.getMyMessages(email);

            if (!message) {
                return res.status(404).json({ error: 'Message not found for the given ID and email.' });
            }

            return res.status(200).json(message);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }

            return res.status(500).json({ error: "An unexpected error occurred" });
        }
    }


    /**
     * This is an asynchronous function that deletes a message by its ID and returns a response indicating whether the message
     * was successfully deleted or not.
     * @param {Request} req - The `req` parameter is an object that represents the HTTP request
     * @param {Response} res - The `res` parameter is the response object
     * @returns a Promise that resolves to a Response object.
     */
    public static async deleteMessageById(req: Request, res: Response): Promise<Response> {
        try {
            const message = await MessageService.deleteMessageById(req.params.id);
            if (message) {
                return res.status(200).json({ message: "message is deleted" });
            }
            return res.status(200).json({ message: "message not found" });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }

            return res.status(500).json({ error: "An unexpected error occurred" });
        }
    }


    /**
     * The function sets a message as read by updating its "isRead" property to true.
     * @param {Request} req - The `req` parameter is an object that represents the HTTP request
     * @param {Response} res - The `res` parameter is the response object
     * @returns a Promise<Response>.
     */
    public static async setMessageReadById(req: Request, res: Response): Promise<Response> {
        try {
            const messageId = req.params.id;
            if (!messageId) {
                return res.status(400).json({ error: "message ID is required in the request parameter" });
            }

            let updateData = req.body;
            if (!updateData) {
                return res.status(400).json({ error: "Update data is required in the request body" });
            }

            updateData.isRead = true;

            const updatedMessage = await MessageService.setMessageReadById(messageId, updateData);

            if (!updatedMessage) {
                return res.status(404).json({ error: "User not found or update failed" });
            }

            return res.status(200).json(updatedMessage);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }

            return res.status(500).json({ error: "An unexpected error occurred" });
        }
    }


}
