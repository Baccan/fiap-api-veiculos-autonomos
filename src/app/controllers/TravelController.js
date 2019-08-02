import Vehicle from '../schemas/Vehicles';
import User from '../schemas/User';

class VehicleController {
  async availableVehicles(req, res) {
    const availables = await Vehicle.find({ available: true });

    return res.json(availables);
  }

  async startTravel(req, res) {
    const { user, vehicle } = req.body;

    await User.findByIdAndUpdate(user.id, {
      inTravel: true,
    });

    res.json({
      message: 'Travel started!',
      user: user,
    });
  }

  async finishTravel(req, res) {
    const { user, vehicle } = req.body;

    await User.findByIdAndUpdate(
      user.id,
      {
        inTravel: false,
      },
      { new: true },
      function(err, model) {
        if (err) return res.status(400).json({ error: 'User not found!' });
      }
    );

    const price = Math.floor(Math.random() * 10 + 1);

    res.json({
      message: 'Travel is finished!',
      user: user,
      price,
    });
  }
}

export default new VehicleController();
