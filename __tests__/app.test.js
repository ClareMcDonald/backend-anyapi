const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Cat = require('../lib/models/Cat');

describe('backend-anyapi routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
});

it('creates a cat', async () => {
  const expected = {
    name: 'Tilly',
    age: 2,
    favoriteTreat: 'canned food'
  };

  const res = await request(app).post('/api/v1/cats').send(expected);

  expect(res.body).toEqual({ id: expect.any(String), ...expected });
});
