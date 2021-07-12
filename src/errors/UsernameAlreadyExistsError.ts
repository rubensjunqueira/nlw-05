import { AppError } from "./AppError";

export class UsernameAlreadyExistsError extends AppError {
  constructor(message: string, status = 400) {
    super(message, status);
  }
}
