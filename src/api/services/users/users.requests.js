import User from '../../models/user';

/**
 * Set in the context the user
 */
export const setUserInCtx = async (id, ctx, next) => {
  ctx.state.user = await User.findOne({ _id: id });

  if (!ctx.state.user) {
    return ctx.boom.notFound('User undefined', { id });
  }

  return await next();
};
