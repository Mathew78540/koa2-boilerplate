import winston from 'winston';

/**
 * Catch all error
 *
 * @description
 * If an error, log it on winston and return error 500
 */
export default async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    winston.log('error', err);
    ctx.boom.badImplementation(err.toString());
  }
};
