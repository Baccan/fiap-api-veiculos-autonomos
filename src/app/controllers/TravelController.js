import Travel from '../schemas/Travel';
import Vehicle from '../schemas/Vehicle';
import User from '../schemas/User';

class VehicleController {
  async availableVehicles(req, res) {
    const availables = await Vehicle.find({ available: true });

    return res.json(availables);
  }

  async startTravel(req, res, next) {
    let { user } = req.body;
    const { vehicle, start_point, finish_point } = req.body;

    await User.find({ _id: user.id }, (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: 'User not found!' });
      }
    });
    await Vehicle.find({ _id: vehicle.id }, (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: 'Vehicle not found!' });
      }
    });

    const inTravel = await Travel.find({
      email: user.email,
      finished: false,
    });

    if (inTravel.length >= 1) {
      return res
        .status(400)
        .json({ error: 'Unable to create a trip during a trip' });
    }

    await User.findByIdAndUpdate(
      user.id,
      {
        inTravel: true,
      },
      { new: true },
      function(err, model) {
        if (err) return res.status(500).json({ error: 'User not updated!' });
        user = {
          _id: model._id,
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
        if (err) return res.status(500).json({ error: 'Vehicle not updated!' });
      }
    );

    const findVehicle = await Vehicle.findById(vehicle.id);

    let price = (start_point + finish_point) / 100;

    if (price < 7) price = 7;

    const travel = await Travel.create({
      user,
      vehicle: findVehicle,
      price,
      start_point,
      finish_point,
    });

    res.json({
      travel,
    });

    return next();
  }

  async finishTravel(req, res) {
    const { user, vehicle } = req.body;

    await Travel.find({ _id: req.params.id }, (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: 'Travel not found!' });
      }
    });

    const findTravel = await Travel.findById(req.params.id);

    if (findTravel.finished) {
      return res.status(400).json({
        message: 'You cannot finish a trip that has already been finalized!',
      });
    }

    await User.find({ _id: user.id }, (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: 'User not found!' });
      }
    });
    await Vehicle.find({ _id: vehicle.id }, (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: 'Vehicle not found!' });
      }
    });

    await User.findByIdAndUpdate(
      user.id,
      {
        inTravel: false,
      },
      { new: true },
      function(err, model) {
        if (err) return res.status(500).json({ error: 'User not updated!' });
      }
    );

    await Vehicle.findByIdAndUpdate(
      vehicle.id,
      {
        available: true,
      },
      { new: true },
      function(err, model) {
        if (err) return res.status(500).json({ error: 'Vehicle not updated!' });
      }
    );

    await Travel.findByIdAndUpdate(
      req.params.id,
      {
        finished: true,
        payed: true,
      },
      { new: true },
      function(err, model) {
        if (err) return res.status(500).json({ error: 'Travel not updated!' });
      }
    );

    return res.json(findTravel);
  }
}

export default new VehicleController();
