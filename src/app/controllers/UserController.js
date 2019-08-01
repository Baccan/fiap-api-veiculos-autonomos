import User from '../schemas/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { name, email } = await User.create(req.body);

    return res.json({
      name,
      email,
    });
  }

  async list(req, res) {
    let users = await User.find({});
    const filterUsers = users.map(user => {
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });
    users = {};
    return res.json(filterUsers);
  }
}

export default new UserController();
