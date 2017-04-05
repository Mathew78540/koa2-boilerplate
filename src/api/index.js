/**
 * Imports
 */
import Koa from 'koa';
import koaHelmet from 'koa-helmet';
import koaCors from 'kcors';
import koaLogger from 'koa-logger';
import koaBodyParser from 'koa-bodyparser';
import koaBoom from './middlewares/boom';
import koaCatchError from './middlewares/catchError';
import koaRequests from './middlewares/requests';
import winston from 'winston';
import apiRouter from './bin/routes';
import mongo from './bin/mongo';
import { appConf, corsConf } from './configs';
import { ENV } from './constants';

/**
 * App
 */
const app = new Koa();

// Logs requests only during the development
if (process.env.NODE_ENV === ENV.DEV) {
  app
    .use(koaLogger());
}

app
  .use(koaBoom)
  .use(koaCatchError)
  .use(koaHelmet())
  .use(koaCors(corsConf))
  .use(koaBodyParser())
  .use(koaRequests)
  .use(apiRouter.routes())
  .use(apiRouter.allowedMethods());

/**
 * Start the server
 */
(async () => { // eslint-disable-line
  try {
    await mongo;
  } catch (error) {
    return winston.log('error', error);
  }

  if (!module.parent) {
    app.listen(appConf.apiPort, winston.log('info', `
      ===================================
      Welcome on Koa2 Boilerplate
      Starting on port ${appConf.apiPort}
      ===================================
    `));
  }
})();

/**
 * Export app
 * Usage : Use for the tests
 */
export default app;
