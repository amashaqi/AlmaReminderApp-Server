class ServiceError extends Error {
  constructor(message, status) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.status = status;
  }

  statusCode() {
    return this.status;
  }
}

export { ServiceError };
