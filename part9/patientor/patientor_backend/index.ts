import express from 'express';
const app = express();
app.use(express.json());

const PORT = 3000;

const BASE_URL = '/api';

app.get(`${BASE_URL}/ping`, (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
