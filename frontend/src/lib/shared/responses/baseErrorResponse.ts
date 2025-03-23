export class BaseErrorResponse {
  error?: string;
  description?: string | null;

  constructor(error: string) {
    this.error = error;
  }
}
