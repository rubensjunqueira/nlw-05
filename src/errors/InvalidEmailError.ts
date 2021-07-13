import { AppError } from "./AppError";

export class InvalidEmailError extends AppError {
  constructor(message = "Email is Invalid!", status = 400) {
    super(message, status);
  }
}
