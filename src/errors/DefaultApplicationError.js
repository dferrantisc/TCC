class DefaultApplicationError extends Error {
  statusCode = 500;

  constructor(message) {
    super(message);
    this.message = message || this.name;
    this.name = "DefaultApplicationError";
  }
}

module.exports = DefaultApplicationError;
