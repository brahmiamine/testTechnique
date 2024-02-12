import { IUser } from '../interfaces/user.interfaces'
import { UserModel } from '../models/user.model'
import bcrypt from 'bcrypt'

export class AuthService {
    /**
     * The register function takes in a user object, hashes the password, creates a new user with the hashed password, and returns the newly created user.
     * @param {IUser} user - The `user` parameter is an object that represents the user being registered.
     * @returns a Promise that resolves to an IUser object.
     */
    public static async register(user: IUser): Promise<IUser> {
        const { password } = user;
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = { ...user, password: hashedPassword }
        return await UserModel.create(newUser)
    }

    /**
     * The login function takes a user object with an email and password, finds the user in the database, checks if the password is correct, and returns the
     * user object if successful.
     * @param {IUser} user - The `user` parameter is an object of type `IUser` which represents the user's login credentials.
     * @returns the user object from the database if the login is successful.
     */
    public static async login(user: IUser): Promise<IUser> {
        const { email, password } = user;
        const userLogin = await UserModel.findOne({ email });

        if (!userLogin) {
            throw new Error('User not found');
        }

        const isPasswordCorrect = await bcrypt.compare(password, userLogin.password);

        if (!isPasswordCorrect) {
            throw new Error('Invalid password');
        }
        return userLogin;

    }

}

