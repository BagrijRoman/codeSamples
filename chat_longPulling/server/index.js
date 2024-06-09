const express = require('express');
const cors = require('cors');

const { addNewMessagesController, getNewMessagesController } = require('./controllers');

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/messages', getNewMessagesController);
app.post('/new-message', addNewMessagesController);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
