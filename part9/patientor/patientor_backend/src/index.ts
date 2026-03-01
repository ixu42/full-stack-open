import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnoses';
import patientRouter from './routes/patients';
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

const BASE_URL = '/api';

app.get(`${BASE_URL}/ping`, (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use(`${BASE_URL}/diagnoses`, diagnosisRouter);
app.use(`${BASE_URL}/patients`, patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
