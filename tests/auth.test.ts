import request from 'supertest';
import app from '../src/app';

describe('Auth endpoints', () => {
  describe('Post /register', () => {
    it('should register a new user and return a JWT token', async () => {
      const res = await request(app)
        .post('/register')
        .send({ username: 'testuser', password: 'Password123!' });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('token');
    });

    it('should not allow duplicate registration', async () => {
      // First registration
      await request(app)
        .post('/register')
        .send({ username: 'duplicateUser', password: 'Password123!' });

      // Attempt duplicate
      const res = await request(app)
        .post('/register')
        .send({ username: 'duplicateUser', password: 'Password123!' });

      expect(res.statusCode).toEqual(409);
      expect(res.body).toHaveProperty('error');
    });

    it('should not allow required data on registration', async () => {
      const res = await request(app).post('/register').send({});

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('Post /login', () => {
    beforeAll(async () => {
      // Register a user for login tests
      await request(app)
        .post('/register')
        .send({ username: 'loginUser', password: 'LoginPass123!' });
    });

    it('should login an existing user and return a JWT token', async () => {
      const res = await request(app)
        .post('/login')
        .send({ username: 'loginUser', password: 'LoginPass123!' });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should not allow invalid credentials', async () => {
      const res1 = await request(app)
        .post('/login')
        .send({ username: 'invalid', password: 'invalid' });

      expect(res1.statusCode).toEqual(401);

      const res2 = await request(app)
        .post('/login')
        .send({ username: 'loginUser', password: 'invalid' });

      expect(res2.statusCode).toEqual(401);
    });

    it('should not allow required data on login', async () => {
      const res = await request(app).post('/login').send({});

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
    });
  });
});
