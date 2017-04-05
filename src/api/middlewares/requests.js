/**
 * Setup default params/query/body
 */
export default async ({ query }, next) => {
  // Default params for the pagination
  query.limit = Number(query.limit) || 10;
  query.offset = Number(query.offset) || 0;
  query.page = Number(query.page) || 2;
  query.select = query.select || '';
  query.populate = query.populate || '';

  return await next();
};
