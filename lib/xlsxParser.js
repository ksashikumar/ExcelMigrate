const xlsx = require('xlsx');

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

module.exports = {
  toJsonArr: (fileName) => {
    const workbook = xlsx.readFile(fileName);
    const sheetNameList = workbook.SheetNames;
    return transformJSON(xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]));
  },
};
