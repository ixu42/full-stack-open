import { isNotNumber, logError, allElemsInArrayAreNums } from './utils';

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface argValues {
  exerHours: number[];
  target: number;
}

const parseArgs = (args: string[]): argValues => {
  if (args.length < 4) throw new Error('Too few arguments.');

  if (isNotNumber(args[2])) {
    throw new Error('Provided values are not numbers.');
  }

  const hoursArr: number[] = [];
  for (let i = 3; i < args.length; i++) {
    if (isNotNumber(args[i])) {
      throw new Error('Provided values are not numbers.');
    }
    hoursArr.push(Number(args[i]));
  }

  return {
    exerHours: hoursArr,
    target: Number(args[2])
  };
};

const getRating = (averageTime: number, target: number): number => {
  if (averageTime >= target) {
    return 3;
  } else if (averageTime >= target * 0.8) {
    return 2;
  } else {
    return 1;
  }
};

const getRatingText = (rating: number): string => {
  switch (rating) {
    case 1:
      return 'There is room to improve 💪';
    case 2:
      return 'Not too bad but could be better';
    case 3:
      return 'Excellent work 🤩 Keep it up';
    default:
      return 'Unexpected value for rating';
  }
};

export const calculateExercises = (
  ExerHours: number[],
  target: number
): Result => {
  const days = ExerHours.length;

  if (days === 0) {
    throw new Error('Period length cannot be 0');
  }

  if (!allElemsInArrayAreNums(ExerHours) || target < 0) {
    throw new Error('Daily hours or target cannot be negative');
  }

  const averageTime =
    ExerHours.reduce((sum, current) => sum + current, 0) / days;
  const rating = getRating(averageTime, target);

  return {
    periodLength: days,
    trainingDays: ExerHours.filter((d) => d !== 0).length,
    success: averageTime >= target,
    rating: rating,
    ratingDescription: getRatingText(rating),
    target: target,
    average: averageTime
  };
};

if (require.main === module) {
  try {
    const { target, exerHours } = parseArgs(process.argv);
    const res = calculateExercises(exerHours, target);
    console.log(res);
  } catch (e: unknown) {
    logError(e);
  }
}
