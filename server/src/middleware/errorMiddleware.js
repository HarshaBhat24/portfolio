// Error handling middleware

// 404 Not Found handler
function notFound(req, res, next) {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

// General error handler
function errorHandler(err, req, res, next) {
  // If response was already sent, delegate to default Express error handler
  if (res.headersSent) {
    return next(err)
  }

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500

  console.error('Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    timestamp: new Date().toISOString()
  })

  res.status(statusCode).json({
    success: false,
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    timestamp: new Date().toISOString()
  })
}

// Async error wrapper
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

module.exports = {
  notFound,
  errorHandler,
  asyncHandler
}
