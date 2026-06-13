const request = require('supertest');
const app = require('../../src/app');

describe('Acceptance Tests - Health Check', () => {
  test('GET /health should return 200 OK with status ok', async () => {
    const response = await request(app).get('/health');
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('timestamp');
  });

  test('Health endpoint should respond quickly (non-functional)', async () => {
    const start = Date.now();
    await request(app).get('/health');
    const duration = Date.now() - start;
    
    expect(duration).toBeLessThan(100); // Deve responder em menos de 100ms
  });

  test('GET /health should have correct content-type', async () => {
    const response = await request(app).get('/health');
    expect(response.headers['content-type']).toMatch(/application\/json/);
  });
});

describe('Acceptance Tests - User Flow Complete', () => {
  test('Complete user CRUD flow', async () => {
    // 1. Create user
    const createRes = await request(app)
      .post('/api/users')
      .send({ name: 'Acceptance User', email: 'acceptance@test.com' });
    expect(createRes.statusCode).toBe(201);
    const userId = createRes.body.id;
    
    // 2. Read user
    const getRes = await request(app).get(`/api/users/${userId}`);
    expect(getRes.statusCode).toBe(200);
    expect(getRes.body.name).toBe('Acceptance User');
    
    // 3. Update user
    const updateRes = await request(app)
      .put(`/api/users/${userId}`)
      .send({ name: 'Updated Acceptance User' });
    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.name).toBe('Updated Acceptance User');
    
    // 4. Delete user
    const deleteRes = await request(app).delete(`/api/users/${userId}`);
    expect(deleteRes.statusCode).toBe(204);
    
    // 5. Verify deletion
    const verifyRes = await request(app).get(`/api/users/${userId}`);
    expect(verifyRes.statusCode).toBe(404);
  });
});