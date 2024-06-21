// tests/controllers/user.controller.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import app from '../index.js';

vi.mock('../server/datamappers/user.datamapper', () => ({
  default: vi.fn().mockImplementation(() => ({
    findUserByEmail: vi.fn().mockResolvedValue(null),  // Suppose aucun utilisateur existant
    createUser: vi.fn().mockResolvedValue(true)        // Suppose la création réussie
  }))
}));

vi.mock('bcryptjs', () => ({
  hash: vi.fn(() => Promise.resolve('hashedPassword'))
}));

vi.mock('email-validator', () => ({
  default: {
    validate: vi.fn().mockReturnValue(true) 
  }
}));

describe('createUser Controller', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return error if the email is not valid', async () => {
    const newUser = {
        lastname: 'Marcus',
        firstname: 'Michel',
        email: 'marcus.michel',
        password: 'Password123',
        confirmPassword: 'Password123'
    };
    const response = await request(app).post('/api/signup').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Cet email n'est pas valide");
});
});
