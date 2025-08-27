const { readLog, clearLog, logError } = require('../logger');

exports.getLog = async (req, res) => {
  try {
    const data = await readLog();
    res.type('text/plain').send(data);
  } catch (err) {
    logError(err);
    res.sendStatus(500);
  }
};

exports.deleteLog = async (req, res) => {
  try {
    await clearLog();
    res.sendStatus(204);
  } catch (err) {
    logError(err);
    res.sendStatus(500);
  }
};
