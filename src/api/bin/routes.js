import koaRouter from 'koa-router';
import requireAll from 'require-all';

/**
 * Routing
 */
const routes = requireAll({
  dirname: __dirname + '/../services',
  filter: /(.+routes)\.js$/,
});

const apiRouter = koaRouter()
  .get('/', ctx => ctx.body = 'Welcome on Seekube API V2')
  .get('/healthz', ctx => ctx.status = 200);

Object.keys(routes).forEach(index => {
  apiRouter.use('', routes[index][`${index}.routes`].default.routes());
});

export default apiRouter;
