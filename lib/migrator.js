const xlsxParser = require('./xlsxParser');
const userValidation = require('../validations/userValidation');
const UserModel = require('../models/user');
const InvalidUserModel = require('../models/invalidUser');

function createInvalidUser(invalidUserObj) {
  const modelObj = new InvalidUserModel(invalidUserObj);
  InvalidUserModel.create(invalidUserObj, (err, modelObj) => {
  });
}

function createValidUser(validUserObj) {
  const modelObj = new UserModel(validUserObj);
  UserModel.create(validUserObj, (err, modelObj) => {
    if (err) {
      createInvalidUser(validUserObj);
    }
  });
}

module.exports = {
  migrate: (fileName, callback) => {
    let xlsxJsonArr;
    xlsxParser.toJsonArr(fileName, (err, xlsxJson) => {
      if (err) {
        callback(err);
      }
      xlsxJsonArr = xlsxJson;
    });
    xlsxJsonArr.forEach((xlsxObj) => {
      const validationResult = userValidation.validate(xlsxObj);
      if (validationResult.error == null) {
        createValidUser(xlsxObj);
      } else {
        createInvalidUser(xlsxObj);
      }
    });
    callback(null);
  },
};
