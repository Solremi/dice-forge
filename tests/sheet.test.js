// Importation de vi pour pouvoir utiliser vi.mock
import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import app from '../index.js';
import { generateAccessToken } from '../server/utils/token.util.js';

// Mocking the SheetDataMapper
vi.mock('../server/datamappers/sheet.datamapper', () => {
    return {
      default: class MockSheetDataMapper {
        async createSheet(sheet) {
          if (!sheet.name || !Number.isInteger(sheet.level) || !Number.isInteger(sheet.game_id)) {
            throw new Error('Invalid input: level and game_id must be integers and name must be provided');
          }
          return { id: 123, ...sheet };
        }
  
        async findSheetByName(name) {
          if (name === 'Test Sheet') {
            return { 
              id: 123, 
              name: 'Test Sheet', 
              image: 'image.png', 
              class: 'Warrior', 
              level: 1, 
              game_id: 1 
            };
          }
          return null;
        }
  
        async findAllSheets() {
          return [
            { id: 123, name: 'Test Sheet', image: 'image.png', class: 'Warrior', level: 1, game_id: 1 },
            { id: 124, name: 'Test Sheet 2', image: 'image2.png', class: 'Mage', level: 2, game_id: 2 }
          ];
        }
      }
    };
  });

describe('createSheet Controller', () => {
    let validToken;

    beforeEach(() => {
        vi.resetAllMocks();
        validToken = generateAccessToken({ id: 'user123', role: 'user' });
    });

    it('should return 201 if the sheet is created successfully', async () => {
        const newSheet = {
          name: 'Test Sheet',
          image: 'image.png',
          class: 'Warrior',
          level: 1,
          game_id: 1
        };
        const response = await request(app)
          .post('/api/sheet')
          .set('Authorization', `Bearer ${validToken}`)  
          .send(newSheet);
        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Test Sheet');
      });

    it('should return 404 if the sheet is not found', async () => {
        const response= await request(app)
            .get('/api/sheet:100')
            .set('Authorization', `Bearer ${validToken}`);
        expect(response.status).toBe(404);
    });

    it('should return 200 if all sheets are found', async () => {
        const response = await request(app)
            .get('/api/binder/:id')
            .set('Authorization', `Bearer ${validToken}`);
        expect(response.status).toBe(200);
    });
});
