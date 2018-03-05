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
    let status;
    let message;
    if (!req.files || !req.files.file) {
      status = 400;
      message = 'File Missing';
      return res.render('error', { status: 400, message });
    }
    const filePath = getFilePath(req.files.file);
    req.files.file.mv(filePath, (err) => {
      if (err) {
        status = 500;
      }
      migrator.migrate(filePath, (migrateErr) => {
        if (migrateErr) {
          status = 400;
          message = err;
        }
      });
    });
    if (status === 400) {
      res.status(400);
      return res.render('error', { status: 400, message });
    } else if (status === 500) {
      res.status(500);
      return res.render('error', { status: 500, message: 'Something went wrong' });
    }
    res.status(200);
    return res.send('File uploaded!');
  },
};
