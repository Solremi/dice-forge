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

    it('should return 400 if license is not found', async () => {
        licenseDataMapper.findLicenseByName.mockResolvedValue(null);

        await createGame(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Licence non trouvée.' });
    });

    it('should return 500 if game creation fails', async () => {
        licenseDataMapper.findLicenseByName.mockResolvedValue({ id: 1 });
        gameDataMapper.createGame.mockResolvedValue(null);

        await createGame(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Erreur lors de la création du jeu.' });
    });

    it('should return 500 if sending email fails', async () => {
        licenseDataMapper.findLicenseByName.mockResolvedValue({ id: 1 });
        gameDataMapper.createGame.mockResolvedValue({ id: 1 });
        sendInvitationEmail.mockResolvedValue({});
        transporter.sendMail.mockImplementation((options, callback) => {
            callback(new Error('Erreur d\'envoi d\'email'), null);
        });

        await createGame(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Erreur lors de l'envoi de l'email" });
    });

    it('should return 201 and created game if everything is fine', async () => {
        const createdGame = { id: 1 };
        licenseDataMapper.findLicenseByName.mockResolvedValue({ id: 1 });
        gameDataMapper.createGame.mockResolvedValue(createdGame);
        sendInvitationEmail.mockResolvedValue({});
        transporter.sendMail.mockImplementation((options, callback) => {
            callback(null, { response: 'Email sent' });
        });

        await createGame(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(createdGame);
    });
});
