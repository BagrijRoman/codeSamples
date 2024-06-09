const { emitter } = require('../helpers/emitter');

const getNewMessagesController = (req, res) => {
  emitter.once('newMessage', (message) => {
    res.json(message);
  });
};

module.exports = { getNewMessagesController };
