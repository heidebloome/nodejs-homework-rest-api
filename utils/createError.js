const errorMessages = {
  400: "Bad request",
  401: "Email or password is wrong",
  404: "Not found",
  409: "Email in use",
}
const createError = (status, message = errorMessages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
}

module.exports = createError;
