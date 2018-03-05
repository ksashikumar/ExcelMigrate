const xlsx = require('xlsx');
const path = require('path');

function transformJSON(xlsxJsonArr) {
  const transformedArr = [];
  xlsxJsonArr.forEach((xlsxJson) => {
    const transformedObj = {};
    Object.keys(xlsxJson).forEach((header) => {
      transformedObj[header.trim().toLowerCase()] = xlsxJson[header];
    });
    transformedArr.push(transformedObj);
  });
  return transformedArr;
}

function validFileExtension(fileName) {
  return ['.xlsx', '.xlsm', '.xltx', '.xltm'].includes(path.extname(fileName));
}

function validXlsxHeaders(xlsxJsonArr) {
  const validHeaders = ['name', 'email', 'phone', 'address'];
  const xlsxHeaders = Object.keys(xlsxJsonArr[0]);
  return xlsxHeaders.every(elem => validHeaders.includes(elem.trim().toLowerCase()));
}

module.exports = {
  toJsonArr: (fileName, callback) => {
    if (!validFileExtension(fileName)) {
      callback('Invalid File');
    }
    const workbook = xlsx.readFile(fileName);
    const sheetNameList = workbook.SheetNames;
    const sheetJson = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
    if (!validXlsxHeaders(sheetJson)) {
      callback('Invalid xlsx headers');
    }
    callback(null, transformJSON(sheetJson));
  },
};
