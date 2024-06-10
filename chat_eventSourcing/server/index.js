const express = require('express');
const cors = require('cors');

const { addNewMessagesController, addConnectionController } = require('./controllers');

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/connect', addConnectionController);
app.post('/new-message', addNewMessagesController);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
