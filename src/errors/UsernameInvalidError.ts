import { AppError } from "./AppError";

export class UsernameInvalidError extends AppError {
  constructor(message = "Username must not be empty!", status = 400) {
    super(message, status);
  }
}
