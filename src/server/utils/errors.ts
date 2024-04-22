import httpStatus from "http-status";

export class DatabaseError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export class ValidationError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = httpStatus.BAD_REQUEST;
    this.message = message;
  }
}

export class AuthError extends Error {
  status: number;

  constructor(message: string, status?: number) {
    super(message);
    this.status = status ?? httpStatus.UNAUTHORIZED;
    this.message = message;
  }
}
