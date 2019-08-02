import Vehicle from '../schemas/Vehicles';
import User from '../schemas/User';

class VehicleController {
  async availableVehicles(req, res) {
    const availables = await Vehicle.find({ available: true });

    return res.json(availables);
  }

  async startTravel(req, res) {
    let { user, vehicle, start_point, finish_point } = req.body;

    await User.findByIdAndUpdate(
      user.id,
      {
        inTravel: true,
      },
      { new: true },
      function(err, model) {
        if (err) return res.status(400).json({ error: 'User not found!' });
        user = {
          id: model._id,
          inTravel: model.inTravel,
          name: model.name,
          email: model.email,
        };
      }
    );

    await Vehicle.findByIdAndUpdate(
      vehicle.id,
      {
        available: false,
      },
      { new: true },
      function(err, model) {
        if (err) return res.status(400).json({ error: 'Vehicle not found!' });
        vehicle = model;

        let price = (start_point + finish_point) / 100;

        if (price < 7) price = 7;

        res.json({
          started: true,
          user,
          vehicle,
          price,
        });
      }
    );
  }

  async finishTravel(req, res) {
    let { user, vehicle, payed } = req.body;

    // if (!payed)
    //   return res
    //     .status(400)
    //     .json({ error: 'You can only finish a paid travel!' });

    await User.findByIdAndUpdate(
      user.id,
      {
        inTravel: false,
      },
      { new: true },
      function(err, model) {
        if (err) return res.status(400).json({ error: 'User not found!' });
        user = {
          id: model._id,
          inTravel: model.inTravel,
          name: model.name,
          email: model.email,
        };
      }
    );

    await Vehicle.findByIdAndUpdate(
      vehicle.id,
      {
        available: true,
      },
      { new: true },
      function(err, model) {
        if (err) return res.status(400).json({ error: 'Vehicle not found!' });
        vehicle = model;

        const price = Math.floor(Math.random() * 10 + 1);

        res.json({
          finished: true,
          user,
          vehicle,
          price,
        });
      }
    );
  }
}

export default new VehicleController();
