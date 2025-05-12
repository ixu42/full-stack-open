export const isNotNumber = (argument: unknown): boolean =>
  isNaN(Number(argument));

export const logError = (error: unknown): void => {
  let errorMsg = 'Error: ';
  if (error instanceof Error) {
    errorMsg += error.message;
  }
  console.log(errorMsg);
};

export const allElemsInArrayAreNums = (arr: number[]): boolean => {
  return arr.every((num) => num >= 0);
};
