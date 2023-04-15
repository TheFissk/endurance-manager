//this is an example of a error handling middleware

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  console.log(res.statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
