const request = require('supertest');
const app = require('../app'); // Path ke aplikasi express kamu
const connection = require('../middleware/db_connect'); // Pastikan ini export connection/pool

describe('Unit Test /', () => {
  it('should respond with index.html', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});

describe('Unit Test /app1', () => {
  it('should respond with "Hello App1!"', async () => {
    const response = await request(app).get('/app1');
    expect(response.status).toBe(200);
  });
});

describe('Unit Test /app2', () => {
  it('should respond with "Hello App2!"', async () => {
    const response = await request(app).get('/app2');
    expect(response.status).toBe(200);
  });
});

describe('Integration Test Connect Database', () => {
  afterAll((done) => {
    // Tutup koneksi pool atau connection setelah SEMUA test selesai
    connection.end(done); // callback agar Jest tahu sudah selesai
  });

  it('should respond with users data', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
  });
});
