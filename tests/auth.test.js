const request = require("supertest")
const app = require("../src/app")

describe('Auth endpoints', () => {

  describe('Post /register', () => {

    it('should register a new user and return a JWT token', async () => {
      const res = await request(app)
        .post('/register')
        .send({username: 'testuser', password: 'Password123!'})
      expect(res.statusCode).toBe(201)
      expect(res.body).toHaveProperty('token')
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
      const res = await request(app)
        .post('/login')
        .send({ username: 'invalid', password: 'invalid' });

      expect(res.statusCode).toEqual(401);
    });

  })
})
