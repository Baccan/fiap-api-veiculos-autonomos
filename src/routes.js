import { Router } from 'express';

import UserController from './app/controllers/UserController';
import VehicleController from './app/controllers/VehicleController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Hello World!' }));

routes.get('/users', UserController.list);
routes.post('/users', UserController.store);
routes.put('/users/:id/wallets', UserController.addWallet);

routes.get('/vehicles', VehicleController.list);
routes.get('/vehicles/:id', VehicleController.vehicleById);
routes.post('/vehicles', VehicleController.store);

export default routes;
