import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

const PORT = 3003;

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  const heightNum = Number(height);
  const weightNum = Number(weight);

  if (!height || !weight || isNaN(heightNum) || isNaN(weightNum)) {
    res.status(400).send({ error: 'malformatted parameters' });
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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const dailyHours: number[] = req.body?.daily_exercises || null;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const target: number = req.body?.target || null;

  // validate existence of fields in request body
  if (dailyHours === null || target === null) {
    res.status(400).send({ error: 'parameters missing' });
    return;
  }

  // validate types
  const targetNum = Number(target);
  if (isNaN(targetNum)) {
    res.status(400).send({ error: 'malformatted parameters' });
    return;
  }
  if (!Array.isArray(dailyHours) || dailyHours.some(isNaN)) {
    res.status(400).send({ error: 'malformatted parameters' });
    return;
  }

  const dailyHoursNums: number[] = dailyHours.map((item) => Number(item));

  try {
    res.send(calculateExercises(dailyHoursNums, targetNum));
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
      return;
    }
    res.status(400).send({ error: 'something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
