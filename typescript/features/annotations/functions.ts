// Annotate the return value
const add = (a: number, b: number): number => {
  return a + b;
};

// Inference on the return value
const multiply = (a: number, b: number) => {
  return a * b;
};

// We will ALWAYS use the annotation for return value because it catches mistakes.
// The following example has a mistake
const subtract = (a: number, b: number) => {
  a - b;
};

// Using function keyword
function divide(a: number, b: number): number {
  return a / b;
}

const modulo = function (a: number, b: number): number {
  return a % b;
};

// Return void
const logger = (message: string): void => {
  console.log(message);
  // return null; // this is an accepted return value
  // return undefined; // this is an accepted return value
};

// Return never
const throwError = (message: string): never => {
  throw new Error(message);
};

// Don't return never
const checkError = (message: string): string => {
  if (!message) {
    throw new Error(message);
  }
  return message;
};

// How to use destructuring
const todaysWeather = {
  date: new Date(),
  weather: "sunny",
};

const logWeather = ({
  date,
  weather,
}: {
  date: Date;
  weather: string;
}): void => {
  console.log(date);
  console.log(weather);
};

logWeather(todaysWeather);
