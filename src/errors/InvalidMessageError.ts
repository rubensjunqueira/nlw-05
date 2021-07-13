import { AppError } from "./AppError";

export class InvalidMessageError extends AppError {
  constructor(message = "Invalid Message Error!", status = 400) {
    super(message, status);
  }
}
