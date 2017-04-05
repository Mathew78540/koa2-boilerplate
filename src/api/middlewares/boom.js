import boom from 'boom';
const helperMethods = [ 'wrap', 'create' ];

/**
 * Middleware KOA
 * Return response with boom
 *
 * @description
 * ctx.boom[MethodBoom]
 */
export default async (ctx, next) => {
  if (ctx.boom) throw new Error('Boom already exists on response object');

  ctx.boom = {};

  Object.keys(boom).forEach((key) => {
    if (typeof boom[key] !== 'function') return;

    if (helperMethods.indexOf(key) !== -1) {
      ctx.boom[key] = () => boom[key].apply(boom, arguments);
    } else {
      ctx.boom[key] = function() { // eslint-disable-line func-names
        const boomed = boom[key].apply(boom, arguments);

        ctx.status = boomed.output.statusCode;
        ctx.body = {
          ...boomed.output.payload,
          data: boomed.data || {},
        };
      };
    }
  });

  return await next();
};
