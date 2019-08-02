import Vehicle from '../schemas/Vehicles';

class VehicleController {
  async availableVehicles(req, res) {
    const availables = await Vehicle.find({ available: true });

    return res.json(availables);
  }
}

export default new VehicleController();
