import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

function encrypt(next) {
  this.password = bcrypt.hashSync(this.password, 8);
  next();
}

UserSchema.pre('save', encrypt);

// checkPassword(camparePass) {
//   return bcrypt.compare(comparePass, this.password);
// };

export default mongoose.model('User', UserSchema);
