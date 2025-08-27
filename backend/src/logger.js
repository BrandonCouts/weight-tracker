const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, '..', 'error.log');

exports.logError = err => {
  const entry = `[${new Date().toISOString()}] ${err.stack || err}\n`;
  fs.appendFile(logPath, entry, () => {});
};

exports.readLog = async () => {
  try {
    return await fs.promises.readFile(logPath, 'utf8');
  } catch (err) {
    return '';
  }
};
