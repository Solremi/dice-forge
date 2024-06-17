// tests/controllers/user.controller.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import app from '../index.js';  // Assurez-vous que cet import pointe vers votre serveur Express
import UserDataMapper from '../server/datamappers/user.datamapper';
import bcrypt from 'bcryptjs';
import emailValidator from 'email-validator';

// Mocking UserDataMapper and other dependencies
vi.mock('../server/datamappers/user.datamapper', () => ({
  default: vi.fn().mockImplementation(() => ({
    findUserByEmail: vi.fn(),
    createUser: vi.fn()
  }))
}));

vi.mock('bcryptjs', () => ({
  hash: vi.fn()
}));

vi.mock('email-validator', () => ({
  validate: vi.fn()
}));

describe('createUser Controller', () => {
  beforeEach(() => {
    UserDataMapper.prototype.findUserByEmail.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashedPassword');
    emailValidator.validate.mockReturnValue(true);
  });

  it('should create a user successfully', async () => {
    const newUser = {
      lastname: 'Doe',
      firstname: 'John',
      email: 'john.doe@example.com',
      password: 'Password123',
      confirmPassword: 'Password123'
    };

    UserDataMapper.prototype.createUser.mockResolvedValue(true);

    const response = await request(app)
      .post('/api/users')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Utilisateur créé");
  });

  it('should return error if passwords do not match', async () => {
    const newUser = {
      lastname: 'Doe',
      firstname: 'John',
      email: 'john.doe@example.com',
      password: 'Password123',
      confirmPassword: 'Password321'
    };

    const response = await request(app)
      .post('/api/user')
      .send(newUser);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Les mots de passe ne correspondent pas");
  });
});
