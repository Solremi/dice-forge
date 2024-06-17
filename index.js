
import 'dotenv/config';
import express from 'express';
import { createServer } from 'node:http';
import router from './server/routers/main.router.js';
import session from 'express-session';
import cors from 'cors';
import corsOptions from './config/cors.config.js';
import setupSocket from './config/socket.config.js';
import errorHandler from './server/middlewares/errorHandler.middleware.js';
import setupSwagger from './config/swagger.config.js';
/*
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
*/

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;

// Middleware pour parser les corps de requêtes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('./public'));

// Activation CORS
app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 },
  })
);

const io = setupSocket(httpServer); 

app.use(router);

/* a mettre en production avec index.html dans le dossier public
app.use('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, './public') });
});
*/

app.use(errorHandler);

setupSwagger(app);

httpServer.listen(PORT, () => {
});

export default app;

