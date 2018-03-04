const ValidUser = require('../models/user');
const InvalidUser = require('../models/invalidUser');

module.exports = {
  validUsersList: async (req, res) => {
    const users = await ValidUser.listUsers({});
    const validUsers = users.map(user => user.transform());
    res.render('users', { isValid: true, items: validUsers });
  },
  invalidUsersList: async (req, res) => {
    const users = await InvalidUser.listUsers({});
    const invalidUsers = users.map(user => user.transform());
    res.render('users', { isValid: false, items: invalidUsers });
  },
};
