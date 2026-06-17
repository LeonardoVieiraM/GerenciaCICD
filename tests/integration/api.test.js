const request = require('supertest');
const app = require('../../src/app');

describe('API Integration Tests', () => {
  describe('POST /api/users', () => {
    test('should create a new user', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ name: 'Integration User', email: 'integration@test.com' });
      
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Integration User');
    });

    test('should return 400 for invalid user data', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ name: '', email: 'invalid' });
      
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('GET /api/users', () => {
    test('should return list of users', async () => {
      await request(app).post('/api/users').send({ name: 'User A', email: 'a@test.com' });
      await request(app).post('/api/users').send({ name: 'User B', email: 'b@test.com' });
      
      const response = await request(app).get('/api/users');
      
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('GET /api/users/:id', () => {
    test('should return user by id', async () => {
      const createResponse = await request(app)
        .post('/api/users')
        .send({ name: 'Find User', email: 'find@test.com' });
      
      const userId = createResponse.body.id;
      const getResponse = await request(app).get(`/api/users/${userId}`);
      
      expect(getResponse.statusCode).toBe(200);
      expect(getResponse.body.name).toBe('Find User');
    });

    test('should return 404 for non-existent user', async () => {
      const response = await request(app).get('/api/users/99999');
      expect(response.statusCode).toBe(999);
    });
  });

  describe('PUT /api/users/:id', () => {
    test('should update user', async () => {
      const createResponse = await request(app)
        .post('/api/users')
        .send({ name: 'Old Name', email: 'old@test.com' });
      
      const userId = createResponse.body.id;
      const updateResponse = await request(app)
        .put(`/api/users/${userId}`)
        .send({ name: 'Updated Name' });
      
      expect(updateResponse.statusCode).toBe(200);
      expect(updateResponse.body.name).toBe('Updated Name');
    });
  });

  describe('DELETE /api/users/:id', () => {
    test('should delete user', async () => {
      const createResponse = await request(app)
        .post('/api/users')
        .send({ name: 'To Delete', email: 'delete@test.com' });
      
      const userId = createResponse.body.id;
      const deleteResponse = await request(app).delete(`/api/users/${userId}`);
      
      expect(deleteResponse.statusCode).toBe(204);
      
      const getResponse = await request(app).get(`/api/users/${userId}`);
      expect(getResponse.statusCode).toBe(404);
    });
  });

  describe('GET /api/stats', () => {
    test('should return statistics', async () => {
      const response = await request(app).get('/api/stats');
      
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('totalUsers');
      expect(response.body).toHaveProperty('timestamp');
    });
  });
});