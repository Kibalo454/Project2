const request = require('supertest');
const express = require('express');

const indexRoutes = require('../routes/index');

const app = express();
app.set('view engine', 'pug');
app.set('views', __dirname + '/../views');
app.use('/', indexRoutes);

// Use a lightweight route that does NOT hit MongoDB
describe('GET /health', () => {
  test('should respond with 200', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
  });
});
