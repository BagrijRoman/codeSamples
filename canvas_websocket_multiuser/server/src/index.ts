import express from 'express';


const app = express();

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.all('/test', (req: express.Request, res: express.Response) => res.json({ serverStatus: "Ok" }))
