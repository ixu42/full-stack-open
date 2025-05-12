export const isNotNumber = (argument: unknown): boolean =>
  isNaN(Number(argument));

export const logError = (error: unknown): void => {
  let errorMsg = 'Error: ';
  if (error instanceof Error) {
    errorMsg += error.message;
  }
  console.log(errorMsg);
};
