import request from 'supertest';
import app from '../src/app';
import User from '../src/models/User';
import sequelize from '../src/config/database';

// beforeAll(async () => {
//     await sequelize.sync({ force: true }); // Sinkronisasi ulang database sebelum semua tes
// });

afterAll(async () => {
    await sequelize.close(); // Tutup koneksi database setelah semua tes selesai
});

describe('Auth Endpoints', () => {
    afterEach(async () => {
        // Bersihkan data setelah setiap pengujian
        await User.destroy({ where: {}, truncate: true });
    });

    it('should register and return success', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'admin@mail.com',
                password: 'secret'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'User registered successfully');
    });
    // it('should login and return a token', async () => {
    //     const res = await request(app)
    //         .post('/auth/login')
    //         .send({
    //             username: 'test',
    //             password: 'password',
    //         });

    //     expect(res.statusCode).toEqual(200);
    //     expect(res.body).toHaveProperty('token');
    // });

    // it('should fail to login with invalid credentials', async () => {
    //     const res = await request(app)
    //         .post('/auth/login')
    //         .send({
    //             username: 'test',
    //             password: 'wrongpassword',
    //         });

    //     expect(res.statusCode).toEqual(401);
    //     expect(res.body).toHaveProperty('message', 'Invalid credentials');
    // });

    // it('should protect routes with middleware', async () => {
    //     const protectedRoute = await request(app)
    //         .get('/protected-route')
    //         .set('Authorization', 'Bearer mock-jwt-token');

    //     expect(protectedRoute.statusCode).toEqual(200);
    // });

    // it('should block access to protected route without token', async () => {
    //     const res = await request(app)
    //         .get('/protected-route');

    //     expect(res.statusCode).toEqual(401);
    //     expect(res.body).toHaveProperty('message', 'Unauthorized');
    // });
});
