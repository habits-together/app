export const addTestDelay = async <T>(value: T): Promise<T> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return value;
};
