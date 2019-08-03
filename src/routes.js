import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import VehicleController from './app/controllers/VehicleController';
import TravelController from './app/controllers/TravelController';

import validateSession from './app/validators/SessionValidator';
import validateUser from './app/validators/UserValidator';
import validateVehicle from './app/validators/VehicleValidator';
import validateWallet from './app/validators/WalletValidator';

import authMiddleware from './app/middlewares/Auth';

const routes = new Router();

routes.post('/sessions', validateSession, SessionController.store);

routes.post('/users', validateUser, UserController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.list);

routes.put('/users/:id/wallets', validateWallet, UserController.addWallet);

routes.get('/vehicles', VehicleController.list);
routes.get('/vehicles/:id', VehicleController.vehicleById);
routes.post('/vehicles', validateVehicle, VehicleController.store);

routes.get('/travels', TravelController.availableVehicles);
routes.post('/travels/start', TravelController.startTravel);
routes.post('/travels/finish/:id', TravelController.finishTravel);

export default routes;
