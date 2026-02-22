export const isNotNumber = (argument: any): boolean => isNaN(Number(argument));

export const logError = (error: unknown): void => {
  let errorMessage = 'Something bad happend.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
};
