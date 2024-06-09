const { emitter } = require('../helpers/emitter');

const addNewMessagesController = (req, res) => {
  const message = req.body;

  emitter.emit('newMessage', message);

  return res.status(200).send();
};

module.exports = { addNewMessagesController };
