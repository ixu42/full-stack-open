import { isNotNumber, logError } from './utils';

interface bmiValues {
  heightCm: number;
  weightKg: number;
}

const parseArgs = (args: string[]): bmiValues => {
  if (args.length < 4) throw new Error('Too few arguments.');
  if (args.length > 4) throw new Error('Too many arguments.');

  if (isNotNumber(args[2]) || isNotNumber(args[3])) {
    throw new Error('Provided values are not numbers.');
  }
  const heightCm = Number(args[2]);
  const weightKg = Number(args[3]);

  if (heightCm <= 0 || weightKg <= 0) {
    throw new Error('Provided values must be greater than 0.');
  }

  return {
    heightCm: Number(args[2]),
    weightKg: Number(args[3])
  };
};

export const calculateBmi = (heightCm: number, weightKg: number): string => {
  const heightM = heightCm / 100;
  const bmi: number = weightKg / heightM ** 2;
  if (bmi < 16.0) return 'Underweight (Severe thinness)';
  if (bmi < 17.0) return 'Underweight (Moderate thinness)';
  if (bmi < 18.5) return 'Underweight (Mild thinness)';
  if (bmi < 25.0) return 'Normal range';
  if (bmi < 30.0) return 'Overweight (Pre-obese)';
  if (bmi < 35.0) return 'Obese (Class I)';
  if (bmi < 40.0) return 'Obese (Class II)';
  return 'Obese (Class III)';
};

// CLI entry point
if (require.main === module) {
  try {
    const { heightCm, weightKg } = parseArgs(process.argv);
    console.log(calculateBmi(heightCm, weightKg));
  } catch (e: unknown) {
    logError(e);
  }
}
