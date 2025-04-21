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
  })
})
