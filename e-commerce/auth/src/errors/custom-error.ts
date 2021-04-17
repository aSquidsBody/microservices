export abstract class CustomError extends Error {
  abstract statusCode: number; // if you extend this class, you MUST have this field

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  // if you extend this class, you MUST have this method
  abstract serializeErrors(): { message: string; field?: string }[];
}
