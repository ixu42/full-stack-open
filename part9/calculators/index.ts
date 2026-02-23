import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { isNotNumber } from './utils';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    return res.status(400).json({
      error: 'Both height and weight should be passed as query parameters.'
    });
  }

  const heightNum = Number(height);
  const weightNum = Number(weight);

  if (isNotNumber(heightNum) || isNotNumber(weightNum)) {
    return res.status(400).json({
      error: 'Height and weight should be numbers.'
    });
  }

  return res.json({
    height: heightNum,
    weight: weightNum,
    bmi: calculateBmi(heightNum, weightNum)
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
