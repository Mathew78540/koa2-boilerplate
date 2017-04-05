import koaRouter from 'koa-router';
import Controller from './users.controller';
import {
  isConnected,
} from '../../middlewares/permissions';
import {
  setUserInCtx,
} from './users.requests';

/**
 * Routes
 */
export default koaRouter()
  .prefix('/users')
  .param('id', setUserInCtx)
    .get('/', Controller.list)
    .get('/:id', Controller.get)
    .post('/', Controller.post)
    .use(isConnected)
      .put('/:id', Controller.put)
      .del('/:id', Controller.del)
      .patch('/:id', Controller.patch);
