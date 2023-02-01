import app from '../server';
import supertest from 'supertest';

describe('GET /', () => {
  it('should return a greeting message', async () => {
    const res = await supertest(app).get('/');

    expect(res.body.message).toBe('Good to see you');
  });
});
