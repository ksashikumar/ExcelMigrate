const mongoose = require('mongoose');

const invalidUserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
}, {
  timestamps: true,
});

invalidUserSchema.methods = {
  transform() {
    const transformed = {};
    const fields = ['id', 'name', 'email', 'phone', 'address', 'createdAt', 'updatedAt'];
    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  },
};

invalidUserSchema.statics = {
  listUsers(options) {
    const { perPage, page } = options;
    return this.find()
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },
};

module.exports = mongoose.model('InvalidUser', invalidUserSchema);
