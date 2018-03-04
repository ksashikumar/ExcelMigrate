const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

userSchema.methods = {
  transform() {
    const transformed = {};
    const fields = ['id', 'name', 'email', 'phone', 'address', 'createdAt', 'updatedAt'];
    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  },
};

userSchema.statics = {
  listUsers(options) {
    const { perPage = 10, page = 1 } = options;
    return this.find()
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },
};

module.exports = mongoose.model('User', userSchema);
