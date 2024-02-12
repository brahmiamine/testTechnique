const supertest = require('supertest');
import { sanitizeUser } from '../utils/sanitizeUser';
import app from '../app';
const { AuthService } = require('../api/services/auth.service');
import jwt from 'jsonwebtoken'
import { generateRandomEmail } from '../utils/functionUtils';

const testUser = {
    name: 'testuser',
    email: generateRandomEmail(),
    password: 'aa'
};

describe('Message Controller', () => {
    let token: string;
    let userId: string;
    beforeAll(async () => {
        const user = await AuthService.register(testUser);
        userId = user._id
        const sanitizedUser = sanitizeUser(user);
        token = jwt.sign(
            { user: sanitizedUser },
            process.env.SECRET_KEY as string,
            { expiresIn: '3d' }
        );
    }, 30000);

    it('should get all messages', async () => {
        const response = await supertest(app)
            .get('/api/v1/messages')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    it('should get a message by id', async () => {
        const response = await supertest(app)
            .get(`/api/v1/messages/${1}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(500);
    });
});


