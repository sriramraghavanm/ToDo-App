const errorHandler = (err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);

  // Set defaults
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = err.message;

  // If in development, send stack trace
  if (process.env.NODE_ENV === 'development') {
    res.status(statusCode).json({
      message,
      stack: err.stack,
    });
  } else {
    // In production, don't send stack trace
    res.status(statusCode).json({
      message: statusCode === 500 ? 'Server Error' : message,
    });
  }
};

module.exports = errorHandler;