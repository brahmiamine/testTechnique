import { IUser } from '../api/interfaces/user.interfaces';

/**
 * The function sanitizes a user object by removing the password property.
 * @param {IUser} user - The `user` parameter is of type `IUser`, which is likely an interface or a type representing a user object.
 * @returns a partial object of type IUser, representing the user without the password property.
 */
export function sanitizeUser(user: IUser): Partial<IUser> {
    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
}
