import { AppError } from "./AppError";

export class UserEmailAlreadyExistsError extends AppError {
  constructor(message: string, status = 400) {
    super(message, status);
  }
}
