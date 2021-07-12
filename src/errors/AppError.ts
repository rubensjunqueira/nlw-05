export class AppError {
  constructor(public message: string, public status = 400) {}
}
