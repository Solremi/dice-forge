import { describe, it, expect, beforeEach, vi } from 'vitest';
import GameDataMapper from '../server/datamappers/game.datamapper.js';
import { createGame } from '../server/controllers/game.controller.js';  

vi.mock('../server/datamappers/game.datamapper.js', () => ({
  default: vi.fn().mockImplementation(() => ({
    findLicenseByName: vi.fn().mockResolvedValue(true),  // Supposons que la licence existe
    createGame: vi.fn().mockResolvedValue({ id: 1, name: 'Test Game' })  // Supposons la création réussie
  }))
}));

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
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    // Instanciation du mock de GameDataMapper
    gameDataMapper = new (vi.mocked(GameDataMapper, true))();
  });

  it('should return 401 if user is not authenticated', async () => {
    req.userData.id = null; // Simuler un utilisateur non authentifié
    await createGame(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Utilisateur non connecté.' });
  });

  it('should return 400 if required fields are missing', async () => {
    req.body.name = ''; // Supposons que le nom est manquant
    await createGame(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Champs de jeu requis manquants.' });
  });
});
