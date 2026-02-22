type Rating = 1 | 2 | 3;

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
  target: number;
  average: number;
}

function getRating(averageHours: number, target: number): Rating {
  if (averageHours >= target) return 3;
  else if (averageHours >= target * 0.8) return 2;
  else return 1;
}

function getRatingDescription(rating: number): string {
  switch (rating) {
    case 1:
      return 'needs improvement';
    case 2:
      return 'not too bad but could be better';
    case 3:
      return 'excellent';
    default:
      return 'Invalid rating';
  }
}

function calculateExercises(dailyHours: number[], targetHours: number): Result {
  const averageHours =
    dailyHours.length > 0
      ? dailyHours.reduce((sum, val) => sum + val, 0) / dailyHours.length
      : 0;

  const rating = getRating(averageHours, targetHours);

  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.reduce(
      (count, hours) => (hours > 0 ? count + 1 : count),
      0
    ),
    success: averageHours >= targetHours ? true : false,
    rating: rating,
    ratingDescription: getRatingDescription(rating),
    target: targetHours,
    average: averageHours
  };
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
