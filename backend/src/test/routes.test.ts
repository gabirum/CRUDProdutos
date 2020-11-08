import request from 'supertest'
import app from '../server'
import connection from '../database/connection'

describe('Testing POST \'/products\' endpoint', () => {
  beforeEach(async () => {
    await connection.migrate.latest();
  })

  afterEach(async () => {
    await connection.migrate.rollback();
  })

  it('Should create a new product', async () => {
    const response = await request(app)
      .post('/products')
      .set('x-api-key', 'apitoken')
      .send({
        name: 'test product',
        category: 'test category',
        price: '12.34'
      })

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty('message', 'Produto criado.')
  })
})