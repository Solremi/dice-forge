import { describe, expect, jest, it } from '@jest/globals';
import { createGame } from '../server/controllers/game.controller.js';
import GameDataMapper from '../server/datamappers/game.datamapper.js';


describe('createGame Controller', () => {
  let req, res, gameDataMapper;

  beforeEach(() => {
    req = {
      body: {
        name: 'Test Game',
        license_name: 'Libre',
        email: 'test@example.com',
      },
      userData: {
        id: 1,
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    gameDataMapper = new GameDataMapper();
  });


    it('should return 401 if user is not authenticated', async () => {
        req.userData.id = null;
        await createGame(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Utilisateur non connecté.' });
    });

    it('should return 400 if required fields are missing', async () => {
        req.body.name = '';
        await createGame(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Champs de jeu requis manquants.' });
    });

    
});

   
    