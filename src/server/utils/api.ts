import { Response } from "express";

export class DatabaseError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export class ValidationError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = 400;
    this.message = message;
  }
}

export class AuthError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = 401;
    this.message = message;
  }
}
