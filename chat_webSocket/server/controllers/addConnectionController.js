const { emitter } = require('../helpers/emitter');

const addConnectionController = (req, res) => {
  res.writeHead(200, {
    "Connection": "keep-alive",
    "Content-type": "text/event-stream",
    "Cache-control": "no-cache",
  });

  emitter.on("newMessage", (message) => {
    res.write(`data: ${JSON.stringify(message)} \n\n`);
  });
};

module.exports = { addConnectionController };
