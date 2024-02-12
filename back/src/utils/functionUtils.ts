/**
 * The function generates a random email address with a specified domain.
 * @param [domain=example.com] - The domain parameter is a string that represents the domain name for the email address. By default, it is set to
 * 'example.com'.
 * @returns a randomly generated email address in the format `@`.
 */
export function generateRandomEmail(domain = 'example.com') {

    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let userName = '';
    const userNameLength = 10;

    for (let i = 0; i < userNameLength; i++) {
        userName += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${userName}@${domain}`;
}