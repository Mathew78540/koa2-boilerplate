import { verify, sign } from 'jsonwebtoken';
import winston from 'winston';
import { appConf } from '../configs';

/**
 * Encode value with JsonWebToken and return value coded
 *
 * @param {any} value
 */
export const encode = (value) => sign(value, appConf.jsonWebToken);

/**
 * Decode token with JsonWebToken and return value or null if error
 *
 * @param {string} token
 */
export const decode = (token) => {
  try {
    const tokenDecoded = verify(token, appConf.jsonWebToken);

    if (tokenDecoded) {
      return tokenDecoded;
    }
  } catch (error) {
    winston.log('error', error);
    return null;
  }
};
