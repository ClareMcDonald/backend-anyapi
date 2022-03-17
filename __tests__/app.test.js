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

  it('creates a cat', async () => {
    const expected = {
      name: 'Tilly',
      age: 2,
      favoriteTreat: 'canned food'
    };
  
    const res = await request(app).post('/api/v1/cats').send(expected);
  
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
  
  it('gets a list of cats', async () => {
    const expected = await Cat.findAll();
    const res = await request(app).get('/api/v1/cats');

    expect(res.body).toEqual(expected);
  });

  it('gets a cat by id', async () => {
    const cat = {
      name: 'Tilly',
      age: 2,
      favoriteTreat: 'canned food'
    };
    const returnedCat = await request(app).post('/api/v1/cats').send(cat);
    // const expected = await Cat.findById(returnedCat.id);
    const res = await request(app).get(`/api/v1/cats/${returnedCat.body.id}`);

    expect(res.body).toEqual({ ...returnedCat.body });
  });

  it('updates a cat by id', async () => {
    const expected = {
      id: expect.any(String),
      name: 'Tilly',
      age: 2,
      favoriteTreat: 'chicken'
    };
    const res = await request(app)
      .patch('/api/v1/cats/1')
      .send({ favoriteTreat: 'chicken' });
    
    expect(res.body).toEqual(expected);
  });
});

