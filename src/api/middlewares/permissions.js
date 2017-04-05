import { decode } from '../helpers/jsonWebToken';

/**
 * Check if the user is connected
 */
export const isConnected = async (ctx, next) => {
  const token = ctx.get('Authorization');
  const tokenDecoded = decode(token);

  // If the token is undefined return 401
  if (!tokenDecoded) {
    return ctx.boom.unauthorized('Invalid token');
  }

  // Save the token decoded in the state
  ctx.state.tokenDecoded = tokenDecoded;

  return await next();
};
