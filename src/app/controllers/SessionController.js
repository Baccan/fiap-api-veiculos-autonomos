import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../schemas/User';

import authConfig from '../../config/Auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email: req.body.email });

    if (!userExists) {
      return res.status(401).json({ error: 'User not found' });
    }

    function checkPassword(pass) {
      return bcrypt.compare(pass, userExists.password);
    }

    if (!(await checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = userExists;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
