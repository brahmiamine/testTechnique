import { IMessage } from '../interfaces/message.interface'
import { MessageModel } from '../models/message.model'


export class MessageService {

    /**
     * The function saves a message by creating a new document in the MessageModel collection.
     * @param {IMessage} message - The parameter `message` is of type `IMessage`, which represents a message object.
     * @returns The `saveMessage` function is returning a Promise that resolves to an `IMessage` object.
     */
    public static async saveMessage(message: IMessage): Promise<IMessage> {
        return await MessageModel.create(message)
    }

    /**
     * The function retrieves all messages from the MessageModel and sorts them in descending order based on their createdAt property.
     * @returns The getAllMessage function is returning a Promise that resolves to an array of IMessage objects.
     */
    public static async getAllMessage(): Promise<IMessage[]> {
        return await MessageModel.find().sort({ createdAt: -1 });
    }

    /**
     * The function `getMessageById` retrieves a message by its ID from the database.
     * @param {string} id - A string representing the unique identifier of the message.
     * @returns a Promise that resolves to either an IMessage object or null.
     */
    public static async getMessageById(id: string): Promise<IMessage | null> {
        return await MessageModel.findById(id)
    }

    /**
     * The function retrieves messages by searching for a specific email in the 'to' field and returns them in descending order of creation.
     * @param {string} email - The `email` parameter is a string that represents the email address to search for in the `to` field of the messages. The
     * function will return an array of messages that match the provided email address.
     * @returns a Promise that resolves to an array of IMessage objects.
     */
    public static async getMyMessages(email: string): Promise<IMessage[]> {
        try {
            const message = await MessageModel.find({ to: email }).sort({ createdAt: -1 }).exec();
            return message;
        } catch (error) {
            console.error('Error fetching message by ID and email:', error);
            throw error;
        }
    }

    /**
     * The function `deleteMessageById` deletes a message with the specified ID from the database and returns the deleted message.
     * @param {string} id - The `id` parameter is a string that represents the unique identifier of the message that needs to be deleted.
     * @returns The `deleteMessageById` function is returning a Promise that resolves to either an `IMessage` object or `null`.
     */
    public static async deleteMessageById(id: string): Promise<IMessage | null> {
        return await MessageModel.findByIdAndDelete(id)
    }

    /**
     * The function updates a message's read status by its ID and returns the updated message.
     * @param {string} id - The id parameter is a string that represents the unique identifier of the message that you want to update. It is used to find the
     * message in the database.
     * @param {any} userData - The `userData` parameter is an object that contains the updated data for the message. It can include properties such as the
     * message content, sender, recipient, timestamp, etc.
     * @returns a Promise that resolves to either an IMessage object or null.
     */
    public static async setMessageReadById(id: string, userData: any): Promise<IMessage | null> {
        return MessageModel.findByIdAndUpdate(id, userData, { new: true }).exec();
    }
}
