const { readLog, logError } = require('../logger');

exports.getLog = async (req, res) => {
  try {
    const data = await readLog();
    res.type('text/plain').send(data);
  } catch (err) {
    logError(err);
    res.sendStatus(500);
  }
};
