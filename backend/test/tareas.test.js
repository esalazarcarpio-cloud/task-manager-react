import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../src/app'
 
describe('API de tareas', () => {
  it('crea una tarea nueva', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ text: 'Escribir informe' })
 
    expect(res.status).toBe(201)
    expect(res.body.text).toBe('Escribir informe')
  })
 
  it('lista las tareas creadas', async () => {
    const res = await request(app).get('/tasks')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })
})
