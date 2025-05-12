import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

const PORT = 3003;

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  const heightNum = Number(height);
  const weightNum = Number(weight);

  if (!height || !weight || isNaN(heightNum) || isNaN(weightNum)) {
    res.send({ error: 'malformatted parameters' }).status(400);
    return;
  }

  if (heightNum <= 0 || weightNum <= 0) {
    res.status(400).send({ error: 'height and weight must be greater than 0' });
  }

  res.send({
    weight: weightNum,
    height: heightNum,
    bmi: calculateBmi(heightNum, weightNum)
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
