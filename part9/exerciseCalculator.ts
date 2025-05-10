interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

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
  }
};

const calculateExercises = (ExerHours: number[], target: number): Result => {
  const days = ExerHours.length;
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

const res = calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2);
console.log(res);
