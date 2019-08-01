import Vehicle from '../schemas/Vehicles';

class VehicleController {
  async store(req, res) {
    const vehicleExists = await Vehicle.findOne({ plate: req.body.plate });

    if (vehicleExists) {
      return res.status(400).json({ error: 'Vehicle already exists' });
    }

    const vehicle = await Vehicle.create(req.body);

    return res.json(vehicle);
  }

  async list(req, res) {
    const vehicles = await Vehicle.find({});

    if (!vehicles) {
      return res.status(400).json({ error: 'No has any vahicle registered!' });
    }

    return res.json(vehicles);
  }

  async vehicleById(req, res) {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(400).json({ error: 'Vehicle not found!' });
    }

    return res.json(vehicle);
  }
}

export default new VehicleController();
