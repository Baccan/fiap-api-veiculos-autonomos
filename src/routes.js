import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import VehicleController from './app/controllers/VehicleController';
import TravelController from './app/controllers/TravelController';

import authMiddleware from './app/middlewares/Auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.list);

routes.put('/users/:id/wallets', UserController.addWallet);

routes.get('/vehicles', VehicleController.list);
routes.get('/vehicles/:id', VehicleController.vehicleById);
routes.post('/vehicles', VehicleController.store);

routes.get('/travels', TravelController.availableVehicles);
routes.post('/travels/start', TravelController.startTravel);
routes.post('/travels/finish/:id', TravelController.finishTravel);

export default routes;
