export const isNotNumber = (argument: any): boolean => isNaN(Number(argument));

export const logError = (error: unknown): void => {
  let errorMsg = 'Error: ';
  if (error instanceof Error) {
    errorMsg += error.message;
  }
  console.log(errorMsg);
};
