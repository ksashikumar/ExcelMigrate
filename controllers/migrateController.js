const fs = require('fs');
const path = require('path');
const migrator = require('../lib/migrator');

function getFilePath(file) {
  const sourceFile = file;
  const tmpPath = path.join(__dirname, '../tmp/');

  if (!fs.existsSync(tmpPath)) {
    fs.mkdirSync(tmpPath);
  }
  return (tmpPath + sourceFile.name);
}

module.exports = {
  index: (req, res) => {
    res.render('index', { title: 'ExcelMigrate' });
  },
  startMigrate: (req, res) => {
    if (!req.files || !req.files.file) {
      res.status(400);
      return res.render('error', { status: 400, message: 'File missing' });
    }
    const filePath = getFilePath(req.files.file);
    req.files.file.mv(filePath, (err) => {
      if (err) {
        res.status(500);
        return res.render('error', { status: 500, message: 'Something went wrong', stack: err.stack });
      }
      migrator.migrate(filePath);
      return res.send('File uploaded!');
    });
  },
};
