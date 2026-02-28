import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { isNotNumber } from './utils';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

const PORT = 3003;

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

  if (heightNum <= 0 || weightNum <= 0) {
    return res.status(400).json({
      error: 'Height and weight must be greater than 0.'
    });
  }

  return res.json({
    height: heightNum,
    weight: weightNum,
    bmi: calculateBmi(heightNum, weightNum)
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  const dailyHours: any = req.body?.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  const targetHours: any = req.body?.target;

  // validate existence of fields
  if (dailyHours == null || targetHours == null) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  // validate types
  if (
    isNotNumber(targetHours) ||
    !Array.isArray(dailyHours) ||
    dailyHours.some(isNotNumber)
  ) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  // concert to numbers explicitly, e.g. "0" => 0
  const targetHoursNum: number = Number(targetHours);
  const dailyHoursNums: number[] = dailyHours.map((i) => Number(i));

  return res.send(calculateExercises(dailyHoursNums, targetHoursNum));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
