/* eslint-disable */
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const ValidationError = require('../../errors/ValidationError');

const defineUserModel = mongoose => {
  const schema = new mongoose.Schema(
    {
      _id: {
        type: String,
        default: uuid
      },
      name: {
        type: String,
        required: true,
        trim: true
      },
      login: {
        type: String,
        required: true,
        trim: true
      },
      password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        validate(value) {
          if (value.includes('password')) {
            throw new ValidationError('Password cannot contain "password"');
          }
        }
      }
    },
    {
      timestamps: false,
      versionKey: false
    }
  );

  schema.methods.toJSON = function() {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
  };

  schema.pre('save', async function(next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 8);
    }
    next();
  });

  const User = mongoose.model('User', schema);
  return User;
};

module.exports = defineUserModel;
