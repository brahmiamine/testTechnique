import { IUser } from '../interfaces/user.interfaces'
import { UserModel } from '../models/user.model'


export class UserService {

    /**
     * The function retrieves all users from the UserModel collection in descending order of their creation date.
     * @returns The getAllUsers function is returning a Promise that resolves to an array of IUser objects.
     */
    public static async getAllUsers(): Promise<IUser[]> {
        return await UserModel.find().sort({ createdAt: -1 });
    }


    /**
     * The function `getUserByEmail` retrieves a user from the database based on their email address.
     * @param {string} email - A string representing the email address of the user.
     * @returns a Promise that resolves to either an IUser object or null.
     */
    public static async getUserByEmail(email: string): Promise<IUser | null> {
        return await UserModel.findOne({ email: email }).exec()
    }

    /**
     * The function deletes a user from the database based on their ID and returns the deleted user or null if no user is found.
     * @param {string} id - The `id` parameter is a string that represents the unique identifier of the user that needs to be deleted.
     * @returns The `deleteUserById` function is returning a promise that resolves to either an `IUser` object or `null`.
     */
    public static async deleteUserById(id: string): Promise<IUser | null> {
        return await UserModel.findByIdAndDelete(id)
    }
    /**
     * The function updates a user by their ID with the provided user data and returns the updated user.
     * @param {string} id - A string representing the unique identifier of the user you want to update.
     * @param {any} userData - The `userData` parameter is an object that contains the updated data for the user. It can include properties such as name,
     * email, age, etc.
     * @returns The updateUserById function is returning a Promise that resolves to either an IUser object or null.
     */
    public static async updateUserById(id: string, userData: any): Promise<IUser | null> {
        return UserModel.findByIdAndUpdate(id, userData, { new: true }).exec();
    }
}
